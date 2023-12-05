import React, { FC, SyntheticEvent, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import MaqasidDialog from "src/components/MaqasidDialog";
import FormsList from "./components/FormsList";
import PostersList from "./components/PostersList";
import ProtocolsList from "./components/ProtocolsList";
import { CustomTabPanel, a11yProps } from "./components/CustomTabPanel";
import { useNavigate, useParams } from "react-router-dom";
import EditPolicyForm from "./components/EditPolicyForm";

const EditPolicyAndDependenciesDialog: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const [value, setValue] = useState<number>(0);

  const { chapterId: chapterIdParam } = useParams();

  const { policyId: policyIdParam } = useParams();

  const chapterId = chapterIdParam ?? "";

  const policyId = policyIdParam ?? "";

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  const navigateToPolicyDetails = () =>
    navigate(`/me/chapters/${chapterId}/policies/${policyId}`);

  const closeMainDialog = () => setIsOpen(false);

  return (
    <MaqasidDialog
      isOpen={isOpen}
      onClose={closeMainDialog}
      onClosed={navigateToPolicyDetails}
      variant="right"
    >
      <MaqasidDialog.Header>
        <MaqasidDialog.Title title="Edit Policy" />
        <MaqasidDialog.Actions>
          <MaqasidDialog.Fullscreen />
          <MaqasidDialog.Close />
        </MaqasidDialog.Actions>
      </MaqasidDialog.Header>
      <MaqasidDialog.Body niceScroll>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs ">
            <Tab label="Policy" {...a11yProps(0)} />
            <Tab label="Forms " {...a11yProps(1)} />
            <Tab label="Posters " {...a11yProps(2)} />
            <Tab label="Protocols " {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <EditPolicyForm
            chapterId={chapterId}
            policyId={policyId}
            closeMainDialog={closeMainDialog}
          />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <FormsList />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <PostersList />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <ProtocolsList />
        </CustomTabPanel>
      </MaqasidDialog.Body>
    </MaqasidDialog>
  );
};

export default EditPolicyAndDependenciesDialog;
