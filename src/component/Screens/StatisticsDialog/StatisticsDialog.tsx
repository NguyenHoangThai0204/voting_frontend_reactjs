// StatisticsDialog.tsx
import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getPollById } from '../../../api/CallApi';
import { Poll } from '../../../typeObject';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define the props interface for StatisticsDialog
interface StatisticsDialogProps {
  open: boolean;
  handleClose: () => void;
  pollId: string;
}

const StatisticsDialog: React.FC<StatisticsDialogProps> = ({ open, handleClose, pollId }) => {
  const [poll, setPoll] = useState<Poll | null>(null);

  useEffect(() => {
    const fetchVote = async () => {
      try {
        const response = await getPollById(pollId);
        setPoll(response.data);
      } catch (error) {
        console.error("Error fetching vote data:", error);
      }
    };
    if (pollId && open) {
      fetchVote();
    }
  }, [pollId, open]);

  // Prepare data for the chart
  const data = {
    labels: poll?.options.map(option => option.contentOption) || [],
    datasets: [
      {
        label: 'Number of Votes',
        data: poll?.options.map(option => option.votes.length) || [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Voting Statistics',
      },
    },
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Statistics</DialogTitle>
      <DialogContent>
        {poll ? (
          <Bar data={data} options={options} />
        ) : (
          <p>Loading...</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StatisticsDialog;
