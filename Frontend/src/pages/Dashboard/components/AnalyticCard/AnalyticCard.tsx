// material-ui
import { Box, Chip, Grid, Stack, Typography } from "@mui/material";

// project import
import MainCard from "src/components/MainCard";
import { AnalyticCardProps } from "./types";

// assets
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const AnalyticCard = ({
  color = "info",
  title,
  count,
  percentage,
  isLoss,
  extra,
}: AnalyticCardProps) => (
  <MainCard contentSX={{ p: 2.25 }}>
    <Stack spacing={0.5}>
      <Typography variant="subtitle2" color="textSecondary">
        {title}
      </Typography>
      <Grid container alignItems="center">
        <Grid item>
          <Typography variant="h5" color="inherit" fontWeight={500}>
            {count}
          </Typography>
        </Grid>
        {percentage && (
          <Grid item>
            <Chip
              variant="filled"
              color={color}
              icon={
                <>
                  {!isLoss && (
                    <TrendingUpIcon
                      style={{ fontSize: "0.75rem", color: "inherit" }}
                    />
                  )}
                  {isLoss && (
                    <TrendingDownIcon
                      style={{ fontSize: "0.75rem", color: "inherit" }}
                    />
                  )}
                </>
              }
              label={`${percentage}%`}
              sx={{ ml: 1.25, pl: 1, borderRadius: 1 }}
              size="small"
            />
          </Grid>
        )}
      </Grid>
    </Stack>
    <Box sx={{ pt: 2.25 }}>
      <Typography variant="caption" color="textSecondary">
        You made an extra{" "}
        <Typography
          component="span"
          variant="caption"
          sx={{ color: `${color || "primary"}.main` }}
        >
          {extra}
        </Typography>{" "}
        this year
      </Typography>
    </Box>
  </MainCard>
);

export default AnalyticCard;
