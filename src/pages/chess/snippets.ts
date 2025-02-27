export const boardRepSnippet = `// game/state/bitboard.rs
pub type BitBoard = u64;
pub trait BitBoardExt {
    fn pop_msb(&mut self) -> u8;
    fn pop_lsb(&mut self) -> u8;
    ...
}

impl BitBoardExt for BitBoard {
    fn pop_lsb(&mut self) -> u8 {
        assert_ne!(*self, 0);
        let lsb = self.trailing_zeros() as u8;
        *self &= !(1 << lsb);
        lsb
    }

    fn pop_msb(&mut self) -> u8 {
        assert_ne!(self, &0);
        let msb = 63 - self.leading_zeros() as u8;
        *self &= !(1 << msb);
        msb
    }

    ...
}

// game/state/chessboard.rs
pub struct ChessBoardSide {
    pub pawn: BitBoard,
    pub knight: BitBoard,
    pub bishop: BitBoard,
    pub rook: BitBoard,
    pub queen: BitBoard,
    pub king: BitBoard,
}

pub struct ChessBoard {
    pub white: ChessBoardSide,
    pub black: ChessBoardSide,
}
`

export const gameStateSnippet = `// game/state/
pub struct GameState {
    pub boards: ChessBoard,
    pub en_passant: BitBoard,
    pub flags: StateFlags,
    pub halfmove: u8,
}
`

export const moveRepresentationSnippet = `// game/move/move.rs
pub type Move = u16;
pub trait MoveExt {
    fn get_from(&self) -> u8;
    fn get_to(&self) -> u8;
    fn is_quiet(&self) -> bool;
    fn is_en_passant(&self) -> bool;
    ...
}

impl MoveExt for Move {
    fn get_from(&self) -> u8 {
        ((*self & Move::FROM_MASK) >> Move::FROM_SHIFT) as u8
    }

    fn get_to(&self) -> u8 {
        ((*self & Move::TO_MASK) >> Move::TO_SHIFT) as u8
    }
    
    fn is_quiet(&self) -> bool {
        let flag = *self & Move::FLAG_MASK;
        flag == Move::QUIET_MOVE || flag == Move::DOUBLE_PAWN_PUSH || flag == Move::KING_CASTLE || flag == Move::QUEEN_CASTLE
    }
    
    fn is_en_passant(&self) -> bool {
        let flag = *self & Move::FLAG_MASK;
        flag == Move::EN_PASSANT
    }
}
`

export const knightMoveGenSnippet = `// game/move/move_maps.rs

/// A MoveMap is a list of 64 bitboards. The bitboard at index i represents the possible moves for a piece at square i.
pub type MoveMap = [BitBoard; 64];

/// A struct containing all necessary MoveMaps for move generation
pub struct MoveMaps {
    pub knight: MoveMap,
    pub king: MoveMap,
    pub ne_diagonal: MoveMap,
    ...
}

impl MoveMaps {
    /// Generates a MoveMap from a list of offsets between index of the target square and the possible moves.
    /// For instance, a piece that can only move up by 1 square would have an offset of 8.
    /// The illegal_files parameter is a list of bitboards.
    /// The bitboard corresponding to an offset is used to filter out moves that would cross the edge of the board.
    fn generate_from_offsets(offsets: Vec<i8>, illegal_files: Vec<BitBoard>) -> MoveMap {
        let mut map: MoveMap = [0; 64];
        for i in 0..64 {
            let mut board: BitBoard = EMPTY;
            for (offset, illegal_file) in offsets.iter().zip(illegal_files.iter()) {
                let to = i + offset;
                if MoveMaps::in_bounds(to) && (illegal_file & (1_u64 << i) == EMPTY) {
                    board |= 1<<to;
                }
            }
            map[i as usize] = board;
        }
        map
    }

    fn generate_knight_map() -> MoveMap {
        let a_file = FILE;
        let ab_file = FILE | (FILE << 1);
        let h_file = FILE << 7;
        let gh_file = (FILE << 7) | (FILE << 6);

        let offsets = vec![
            -17, -15, -10, -6, 6, 10, 15, 17 
        ];

        let illegal_files= vec![
            a_file, h_file, ab_file, gh_file, ab_file, gh_file, a_file, h_file
        ];
        MoveMaps::generate_from_offsets(offsets, illegal_files)
    }
}

// game/move/move_generator.rs

...

impl MoveGenerator {
    fn get_pseudo_legal_knight_moves(&mut self) {
        let mut knights = self.friendly_pieces.knight;
        let move_map = &self.move_maps.knight;
        // While there are knights we haven't processed
        while knights != EMPTY {
            // Pop the first knight and get the index
            let from = knights.pop_lsb();

            // Get a copy of all possible knight moves
            let to_board = move_map[from as usize] & !self.friendly_occupation;
            // Remove any moves that are occupied by friendly pieces
            // Check for captures
            let mut to_capture = to_board & self.enemy_occupation;
            let mut to_quiet = to_board & !self.enemy_occupation;

            while to_capture != EMPTY {
                let to = to_capture.pop_lsb();
                self.add_move(Move::new(from, to, Move::CAPTURE));
            }
            while to_quiet != EMPTY {
                let to = to_quiet.pop_lsb();
                self.add_move(Move::new(from, to, Move::QUIET_MOVE));
            }
        }
    }
}
`

export const makeUnmakeSnippet = ` // game/state/make_unmake.rs

/// Irreversible information needed to unmake a move
struct IrreversibleInfo {
    halfmove: u8,
    en_passant: BitBoard,
    flags: StateFlags,
    captured_piece_type: Option<PieceType>,
}

pub struct MakeUnmaker<'a> {
    pub state: &'a mut GameState,
    pub zobrist_hash: u64,
    irreversible_stack: Vec<IrreversibleInfo>,
    zobrist_numbers: ZobristNumbers,
}

impl MakeUnmaker<'_> {
    pub fn make_move(&mut self, m: Move) {
        let halfmove = self.state.halfmove;
        let en_passant = self.state.en_passant;
        let flags = self.state.flags;

        let mut captured_piece_type = None;
        if m.is_castle() {
            self.make_castle(m);
            if self.state.en_passant != 0 {
                self.zobrist_hash ^= self.zobrist_numbers.en_passant_file[self.get_en_passant_file()];
            }
            self.state.en_passant = 0;
        } else {
            captured_piece_type = self.make_non_castle(m);

        }
        // Stack irreversible info
        self.irreversible_stack.push(IrreversibleInfo {
            halfmove,
            en_passant,
            flags,
            captured_piece_type,
        });

        self.state.halfmove += 1;
        self.update_flags(m);
    }

    fn make_non_castle(&mut self, m: Move) -> Option<PieceType> {
        let (friendly_zobrist, enemy_zobrist) = if self.state.flags.is_white_to_play() {
            (&self.zobrist_numbers.board.white, &self.zobrist_numbers.board.black)
        } else {
            (&self.zobrist_numbers.board.black, &self.zobrist_numbers.board.white)
        }

        // Undo en passant hash
        if self.state.en_passant != 0 {
            self.zobrist_hash ^= self.zobrist_numbers.en_passant_file[self.get_en_passant_file()];
        }
        self.state.en_passant = if m & Move::FLAG_MASK == Move::DOUBLE_PAWN_PUSH {
            if white_to_play {
                1 << (m.get_from() + 8)
            } else {
                1 << (m.get_from() - 8)
            }
        } else { 0 };
        // Redo en passant hash
        if self.state.en_passant != 0 {
            self.zobrist_hash ^= self.zobrist_numbers.en_passant_file[self.get_en_passant_file()];
        }

        let from_board = 1_u64 << m.get_from();
        let to_board = 1_u64 << m.get_to();
        let (friendly_boards, enemy_boards) = self.state.split_boards_mut();
        let friendly_board_list = friendly_boards.as_array_mut();
        let enemy_board_list = enemy_boards.as_array_mut();

        let friendly_zobrist_number_list = friendly_zobrist.as_array();
        let enemy_zobrist_number_list = enemy_zobrist.as_array();

        // Remove friendly piece from from_board
        let mut moved_piece_board: &mut BitBoard = &mut 0;
        let mut moved_piece_zobrist: [u64; 64] = [0; 64];

        for i in 0..6 {
            if *friendly_board_list[i].0 & from_board != 0 {
                *friendly_board_list[i].0 &= !from_board;
                self.zobrist_hash ^= friendly_zobrist_number_list[i][m.get_from() as usize];
                moved_piece_board = friendly_board_list[i].0;
                moved_piece_zobrist = friendly_zobrist_number_list[i];
                break;
            }
        }

        // If the move is not a promotion, add to_board to moved_piece_board
        if !m.is_promotion() {
            *moved_piece_board |= to_board;
            self.zobrist_hash ^= moved_piece_zobrist[m.get_to() as usize];
        } else {
            // Otherwise, add the promotion piece to the board
            let non_capture_promotion_flag = if m.is_capture() {
                m.capture_promotion_to_promotion()
            } else {
                m & Move::FLAG_MASK
            };
            match non_capture_promotion_flag {
                Move::KNIGHT_PROMOTION => {
                    friendly_boards.knight |= to_board;
                    self.zobrist_hash ^= friendly_zobrist.knight[m.get_to() as usize];
                },
                Move::BISHOP_PROMOTION => {
                    friendly_boards.bishop |= to_board;
                    self.zobrist_hash ^= friendly_zobrist.bishop[m.get_to() as usize];
                },
                Move::ROOK_PROMOTION => {
                    friendly_boards.rook |= to_board;
                    self.zobrist_hash ^= friendly_zobrist.rook[m.get_to() as usize];
                },
                Move::QUEEN_PROMOTION => {
                    friendly_boards.queen |= to_board;
                    self.zobrist_hash ^= friendly_zobrist.queen[m.get_to() as usize];
                },
                _ => panic!("Invalid promotion flag"),
            }
        }
        // If the move is en passant, shift to_board to the captured pawn
        let temp_to_board;
        let temp_to;
        if m & Move::FLAG_MASK == Move::EN_PASSANT {
            (temp_to_board, temp_to) = if white_to_play {
                (to_board >> 8, m.get_to() - 8)
            } else {
                (to_board << 8, m.get_to() + 8)
            };
        } else {
            temp_to_board = to_board;
            temp_to = m.get_to();
        }
        // Remove enemy piece from to_board
        if m.is_capture() {
            for i in 0..6 {
                if *enemy_board_list[i].0 & temp_to_board != 0 {
                    *enemy_board_list[i].0 &= !temp_to_board;
                    self.zobrist_hash ^= enemy_zobrist_number_list[i][temp_to as usize];
                    return Some(enemy_board_list[i].1);
                }
            }
        }
        None
    }
}

`