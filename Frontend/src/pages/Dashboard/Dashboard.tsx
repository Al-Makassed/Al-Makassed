// MUI
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

// project imports
import { useState } from "react";
import MainCard from "src/components/MainCard";
import AnalyticCard from "./components/AnalyticCard";
import BarChart from "./components/BarChart";
import AreaChart from "./components/IncomeAreaChart";
import OrdersTable from "./components/OrdersTable";
import ReportAreaChart from "./components/ReportAreaChart";
import SalesColumnChart from "./components/SalesColumnChart";

// assets
import GiftOutlined from "@mui/icons-material/CardGiftcard";
import MessageOutlined from "@mui/icons-material/Chat";
import SettingOutlined from "@mui/icons-material/Settings";

import { amber, green, lightBlue } from "@mui/material/colors";
import avatar1 from "src/assets/images/users/avatar-1.png";
import avatar2 from "src/assets/images/users/avatar-2.png";
import avatar3 from "src/assets/images/users/avatar-3.png";
import avatar4 from "src/assets/images/users/avatar-4.png";

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: "1rem",
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: "auto",
  right: "auto",
  alignSelf: "flex-start",
  transform: "none",
};

// sales report status
const status = [
  {
    value: "today",
    label: "Today",
  },
  {
    value: "month",
    label: "This Month",
  },
  {
    value: "year",
    label: "This Year",
  },
];

const Dashboard = () => {
  const [value, setValue] = useState("today");
  const [slot, setSlot] = useState("week");

  return (
    <Grid
      id="DashboardGrid"
      container
      rowSpacing={4.5}
      columnSpacing={2.75}
      sx={{ p: 3 }}
    >
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h6">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticCard
          title="Total Page Views"
          count="4,42,236"
          percentage={59.3}
          extra="35,000"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticCard
          title="Total Users"
          count="78,250"
          percentage={70.5}
          extra="8,900"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticCard
          title="Total Order"
          count="18,800"
          percentage={27.4}
          isLoss
          color="error"
          extra="1,943"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticCard
          title="Total Sales"
          count="$35,078"
          percentage={27.4}
          isLoss
          color="error"
          extra="$20,395"
        />
      </Grid>

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h6">Unique Visitor</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={0}>
              <Button
                size="small"
                onClick={() => setSlot("month")}
                sx={{ color: slot === "month" ? "primary" : "grey.600" }}
                variant={slot === "month" ? "outlined" : "text"}
              >
                Month
              </Button>
              <Button
                size="small"
                onClick={() => setSlot("week")}
                sx={{ color: slot === "week" ? "primary" : "grey.600" }}
                variant={slot === "week" ? "outlined" : "text"}
              >
                Week
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <AreaChart slot={slot} />
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h6">Income Overview</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="subtitle2" color="textSecondary">
                This Week Statistics
              </Typography>
              <Typography variant="h4">$7,650</Typography>
            </Stack>
          </Box>
          <BarChart />
        </MainCard>
      </Grid>

      {/* row 3 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h6">Recent Orders</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h6">Analytics Report</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List sx={{ p: 0, "& .MuiListItemButton-root": { py: 2 } }}>
            <ListItemButton divider>
              <ListItemText secondary="Company Finance Growth" />
              <Typography variant="subtitle2" fontWeight={500}>
                +45.14%
              </Typography>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemText secondary="Company Expenses Ratio" />
              <Typography variant="subtitle2" fontWeight={500}>
                0.58%
              </Typography>
            </ListItemButton>
            <ListItemButton>
              <ListItemText secondary="Business Risk Cases" />
              <Typography variant="subtitle2" fontWeight={500}>
                Low
              </Typography>
            </ListItemButton>
          </List>
          <ReportAreaChart />
        </MainCard>
      </Grid>

      {/* row 4 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h6">Sales Report</Typography>
          </Grid>
          <Grid item>
            <TextField
              id="sales-report-period"
              size="small"
              select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              sx={{
                "& .MuiInputBase-input": { py: 0.5, fontSize: "0.875rem" },
              }}
            >
              {status.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <MainCard sx={{ mt: 1.75 }}>
          <Stack spacing={1.5} sx={{ mb: -15 }}>
            <Typography variant="subtitle1" color="grey.700">
              Net Profit
            </Typography>
            <Typography variant="h5" fontWeight={500}>
              $1560
            </Typography>
          </Stack>
          <SalesColumnChart />
        </MainCard>
      </Grid>

      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h6">Transaction History</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List
            component="nav"
            sx={{
              px: 0,
              py: 0,
              "& .MuiListItemButton-root": {
                py: 1.5,
                "& .MuiAvatar-root": avatarSX,
                "& .MuiListItemSecondaryAction-root": {
                  ...actionSX,
                  position: "relative",
                },
              },
            }}
          >
            <ListItemButton divider>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: "success.main",
                    bgcolor: green[50],
                  }}
                >
                  <GiftOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle2">Order #002434</Typography>
                }
                secondary="Today, 2:00 AM"
              />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle2" noWrap>
                    + $1,430
                  </Typography>
                  <Typography variant="subtitle2" color="grey.600" noWrap>
                    78%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: "info.main",
                    bgcolor: lightBlue[50],
                  }}
                >
                  <MessageOutlined fontSize="small" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle2">Order #984947</Typography>
                }
                secondary="5 August, 1:45 PM"
              />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle2" noWrap>
                    + $302
                  </Typography>
                  <Typography variant="subtitle2" color="grey.600" noWrap>
                    8%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: "error.light",
                    bgcolor: amber[50],
                  }}
                >
                  <SettingOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle2">Order #988784</Typography>
                }
                secondary="7 hours ago"
              />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle2" noWrap>
                    + $682
                  </Typography>
                  <Typography variant="subtitle2" color="grey.600" noWrap>
                    16%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
          </List>
        </MainCard>
        <MainCard sx={{ mt: 2 }}>
          <Stack spacing={3}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Stack>
                  <Typography variant="subtitle2" noWrap>
                    Help & Support Chat
                  </Typography>
                  <Typography variant="caption" color="grey.600" noWrap>
                    Typically reply within 5 min
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <AvatarGroup
                  sx={{ "& .MuiAvatar-root": { width: 32, height: 32 } }}
                >
                  <Avatar alt="Remy Sharp" src={avatar1} />
                  <Avatar alt="Travis Howard" src={avatar2} />
                  <Avatar alt="Cindy Baker" src={avatar3} />
                  <Avatar alt="Agnes Walker" src={avatar4} />
                </AvatarGroup>
              </Grid>
            </Grid>
            <Button
              size="small"
              variant="contained"
              sx={{ textTransform: "capitalize" }}
            >
              Need Help?
            </Button>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
