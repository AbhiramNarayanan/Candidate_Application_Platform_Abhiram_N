import { Dialog, DialogTitle, DialogContent, Typography, IconButton } from '@mui/material';
import { AiOutlineClose } from "react-icons/ai";
import { BiBuildingHouse } from "react-icons/bi";
import { FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";

const JobModal = ({ job, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <AiOutlineClose />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="h6" component="h2">
          {job.companyName}
        </Typography>
        <Typography variant="subtitle1" component="h2">
          {job.jobRole.charAt(0).toUpperCase() + job.jobRole.slice(1)}
        </Typography>
        <Typography variant="body1" component="h2">
          {job.location.charAt(0).toUpperCase() + job.location.slice(1)}
        </Typography>
        <Typography variant="body2" component="p">
          {job.jobDetailsFromCompany}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default JobModal;
