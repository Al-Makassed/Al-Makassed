import React, { FC, SyntheticEvent, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import MaqasidDialog from "src/components/MaqasidDialog";
import FormsList from "./components/FormsList";
import PostersList from "./components/PostersList";
import ProtocolsList from "./components/ProtocolsList";
import TabPanel from "src/components/TabPanel/TabPanel";
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

      <MaqasidDialog.Body niceScroll noPadding>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="Policy Tabs">
            <Tab label="Policy" />
            <Tab label="Forms" />
            <Tab label="Posters" />
            <Tab label="Protocols" />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0} sx={{ p: 3 }}>
          <EditPolicyForm
            chapterId={chapterId}
            policyId={policyId}
            closeMainDialog={closeMainDialog}
          />
        </TabPanel>

        <TabPanel value={value} index={1} sx={{ py: 2, px: 3 }}>
          <FormsList />
        </TabPanel>

        <TabPanel value={value} index={2} sx={{ py: 2, px: 3 }}>
          <PostersList />
        </TabPanel>

        <TabPanel value={value} index={3} sx={{ py: 2, px: 3 }}>
          <ProtocolsList />
        </TabPanel>
      </MaqasidDialog.Body>
    </MaqasidDialog>
  );
};

export default EditPolicyAndDependenciesDialog;
