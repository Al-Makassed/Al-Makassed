import { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Typography } from "@mui/material";
export default function ListCh() {
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  //****************** */git ch
  const chs = [
    {
      id: "bdb1c189-29d5-434f-51bc-08dbc391f487",
      name: "Patient Safety Goals",
      enableState: false,
      policies: [
        {
          code: "IPCG. PCI -2",
          name: "Telephone Order Policy",
          state: false,
          pdfUrl: "policystring",
          chapterId: "bdb1c189-29d5-434f-51bc-08dbc391f487",
          dependencies: [
            {
              code: "Form Code -1",
              pdfUrl: "formstring",
              estimatedTime: 10,
              pagesCount: 0,
              policyCode: "IPCG. PCI -2",
              policyDependencyType: 0,
            },
          ],
        },
      ],
    },
    {
      id: "bdb1c189-29d5-434f-51bc-08dbc391f487",
      name: "Patient Safety Goals",
      enableState: false,
      policies: [
        {
          code: "IPCG. PCI -2",
          name: "Telephone Order Policy",
          state: false,
          pdfUrl: "policystring",
          chapterId: "bdb1c189-29d5-434f-51bc-08dbc391f487",
          dependencies: [
            {
              code: "Form Code -1",
              pdfUrl: "formstring",
              estimatedTime: 10,
              pagesCount: 0,
              policyCode: "IPCG. PCI -2",
              policyDependencyType: 0,
            },
          ],
        },
      ],
    },
    {
      id: "bdb1c189-29d5-434f-51bc-08dbc391f487",
      name: "Patient Safety Goals",
      enableState: false,
      policies: [
        {
          code: "IPCG. PCI -2",
          name: "Telephone Order Policy",
          state: false,
          pdfUrl: "policystring",
          chapterId: "bdb1c189-29d5-434f-51bc-08dbc391f487",
          dependencies: [
            {
              code: "Form Code -1",
              pdfUrl: "formstring",
              estimatedTime: 10,
              pagesCount: 0,
              policyCode: "IPCG. PCI -2",
              policyDependencyType: 0,
            },
          ],
        },
      ],
    },
    {
      id: "bdb1c189-29d5-434f-51bc-08dbc391f487",
      name: "Patient Safety Goals",
      enableState: false,
      policies: [
        {
          code: "IPCG. PCI -2",
          name: "Telephone Order Policy",
          state: false,
          pdfUrl: "policystring",
          chapterId: "bdb1c189-29d5-434f-51bc-08dbc391f487",
          dependencies: [
            {
              code: "Form Code -1",
              pdfUrl: "formstring",
              estimatedTime: 10,
              pagesCount: 0,
              policyCode: "IPCG. PCI -2",
              policyDependencyType: 0,
            },
          ],
        },
      ],
    },
    {
      id: "bdb1c189-29d5-434f-51bc-08dbc391f487",
      name: "Patient Safety Goals",
      enableState: false,
      policies: [
        {
          code: "IPCG. PCI -2",
          name: "Telephone Order Policy",
          state: false,
          pdfUrl: "policystring",
          chapterId: "bdb1c189-29d5-434f-51bc-08dbc391f487",
          dependencies: [
            {
              code: "Form Code -1",
              pdfUrl: "formstring",
              estimatedTime: 10,
              pagesCount: 0,
              policyCode: "IPCG. PCI -2",
              policyDependencyType: 0,
            },
          ],
        },
      ],
    },
    {
      id: "bdb1c189-29d5-434f-51bc-08dbc391f487",
      name: "Patient Safety Goals",
      enableState: false,
      policies: [
        {
          code: "IPCG. PCI -2",
          name: "Telephone Order Policy",
          state: false,
          pdfUrl: "policystring",
          chapterId: "bdb1c189-29d5-434f-51bc-08dbc391f487",
          dependencies: [
            {
              code: "Form Code -1",
              pdfUrl: "formstring",
              estimatedTime: 10,
              pagesCount: 0,
              policyCode: "IPCG. PCI -2",
              policyDependencyType: 0,
            },
          ],
        },
      ],
    },
    {
      id: "bdb1c189-29d5-434f-51bc-08dbc391f487",
      name: "Patient Safety Goals",
      enableState: false,
      policies: [
        {
          code: "IPCG. PCI -2",
          name: "Telephone Order Policy",
          state: false,
          pdfUrl: "policystring",
          chapterId: "bdb1c189-29d5-434f-51bc-08dbc391f487",
          dependencies: [
            {
              code: "Form Code -1",
              pdfUrl: "formstring",
              estimatedTime: 10,
              pagesCount: 0,
              policyCode: "IPCG. PCI -2",
              policyDependencyType: 0,
            },
          ],
        },
      ],
    },
    {
      id: "bdb1c189-29d5-434f-51bc-08dbc391f487",
      name: "Patient Safety Goals",
      enableState: false,
      policies: [
        {
          code: "IPCG. PCI -2",
          name: "Telephone Order Policy",
          state: false,
          pdfUrl: "policystring",
          chapterId: "bdb1c189-29d5-434f-51bc-08dbc391f487",
          dependencies: [
            {
              code: "Form Code -1",
              pdfUrl: "formstring",
              estimatedTime: 10,
              pagesCount: 0,
              policyCode: "IPCG. PCI -2",
              policyDependencyType: 0,
            },
          ],
        },
      ],
    },
    {
      id: "bdb1c189-29d5-434f-51bc-08dbc391f487",
      name: "Patient Safety Goals",
      enableState: false,
      policies: [
        {
          code: "IPCG. PCI -2",
          name: "Telephone Order Policy",
          state: false,
          pdfUrl: "policystring",
          chapterId: "bdb1c189-29d5-434f-51bc-08dbc391f487",
          dependencies: [
            {
              code: "Form Code -1",
              pdfUrl: "formstring",
              estimatedTime: 10,
              pagesCount: 0,
              policyCode: "IPCG. PCI -2",
              policyDependencyType: 0,
            },
          ],
        },
      ],
    },
    {
      id: "bdb1c189-29d5-434f-51bc-08dbc391f487",
      name: "Patient Safety Goals",
      enableState: false,
      policies: [
        {
          code: "IPCG. PCI -2",
          name: "Telephone Order Policy",
          state: false,
          pdfUrl: "policystring",
          chapterId: "bdb1c189-29d5-434f-51bc-08dbc391f487",
          dependencies: [
            {
              code: "Form Code -1",
              pdfUrl: "formstring",
              estimatedTime: 10,
              pagesCount: 0,
              policyCode: "IPCG. PCI -2",
              policyDependencyType: 0,
            },
          ],
        },
      ],
    },
  ];
  console.log(chs[0].policies[0].name);

  //********************* */
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 329,
        bgcolor: (theme) => theme.palette.maqasid.secondary,
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {chs.map((ch, index) => (
        <Box key={index}>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <MenuBookIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <Typography fontWeight={600} display="inline">
              {ch.name}
            </Typography>

            <ListItemButton>
              {" "}
              <ListItemIcon>
                <AutoFixNormalIcon
                  sx={{
                    paddingLeft: "1em",
                    color: (theme) => theme.palette.maqasid.primary,
                  }}
                />
              </ListItemIcon>
            </ListItemButton>

            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon
                  sx={{ color: (theme) => theme.palette.maqasid.primary }}
                >
                  <AddCircleIcon />
                </ListItemIcon>
                {/* <ListItemText primary="Add policy" /> */}
                <Typography fontWeight={590}>Add Policy</Typography>
              </ListItemButton>
              {ch.policies.map((pol, index) => (
                <ListItemButton key={index} sx={{ pl: 4 }}>
                  <ListItemText sx={{ pl: 6 }} primary={pol.name} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </Box>
      ))}
    </List>
  );
}
