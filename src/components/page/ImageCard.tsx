import { Card, CardContent, CardMedia, Typography, useTheme } from "@mui/material";

export default function ImageCard({ image, title, subtitle }: { image: string, title: string, subtitle: string }) {
  const theme = useTheme();

  return (
    <Card sx={{
      width: "100%",
      aspectRatio: "4/3",
      ml: "auto",
      mr: "auto",
      mb: 4,
      mt: 4,
      position: "relative",
      borderRadius: 2,
      // For the gradient overlay:
      "&:after": {
        content: '""',
        display: "block",
        position: "absolute",
        width: "100%",
        height: "64%",
        bottom: 0,
        zIndex: 1,
        background: "linear-gradient(to top, #000, rgba(0,0,0,0))",
      },
    }}>
      <CardMedia
        image={image}
        sx={{
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          backgroundPosition: "0% 70%",
          position: "absolute",
          filter: "brightness(80%)",
          zIndex: 0,
        }}
      />
      <CardContent sx={{
        zIndex: 2,
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: 4,
        color: theme.palette.common.white,
      }}>
        <Typography variant="h2" sx={{ zIndex: 2 }}>{title}</Typography>
        <Typography variant="subtitle1" sx={{ zIndex: 2 }}>{subtitle}</Typography>
      </CardContent>
    </Card>
  );
}
