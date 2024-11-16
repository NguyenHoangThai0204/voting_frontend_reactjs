import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { getPollById } from '../../../api/CallApi';
import { Poll } from '../../../typeObject';
import io from 'socket.io-client';
import './StatisticsDialogPolling.css';

interface StatisticsDialogProps {
  open: boolean;
  handleClose: () => void;
  pollId: string;
}

const animalEmojis = [
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
  '🦁', '🐮', '🐷', '🐸', '🐵', '🐧', '🐦', '🐤', '🐣', '🐺',
  '🦄', '🐴', '🦓', '🐘', '🦏', '🦛', '🐪', '🐫', '🦙', '🦒',
  '🦘', '🦔', '🐾', '🐉', '🐲', '🐊', '🐢', '🦎', '🐍', '🐅',
  '🐆', '🦕', '🦖', '🐋', '🐳', '🐬', '🦈', '🐟', '🐠', '🐡',
  '🦐', '🦑', '🦞', '🦀', '🐙'
];

const socket = io("http://localhost:3000", { transports: ['websocket'] });
// Đảm bảo rằng địa chỉ WebSocket của bạn chính xác

const StatisticsDialogPolling: React.FC<StatisticsDialogProps> = ({ open, handleClose, pollId }) => {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const [animalEmojisState, setAnimalEmojisState] = useState<string[]>([]);
  const [remainingTime, setRemainingTime] = useState<string | null>(null);

  const updatePollData = (data: Poll) => {
    setPoll(data);
    const total = data.options.reduce((acc, option) => acc + option.votes.length, 0);
    setTotalVotes(total);

    // Randomize emojis cho mỗi tùy chọn
    const selectedEmojis = data.options.map(() =>
      animalEmojis[Math.floor(Math.random() * animalEmojis.length)]
    );
    setAnimalEmojisState(selectedEmojis);
  };

  useEffect(() => {
    const fetchVote = async () => {
      try {
        const response = await getPollById(pollId);
        updatePollData(response.data);
      } catch (error) {
        console.error('Error fetching vote data:', error);
      }
    };

    if (pollId && open) {
      fetchVote();
      socket.on('connect', () => {
        console.log('Connected to WebSocket server');
      });
      
      socket.on('connect_error', (err) => {
        console.log('WebSocket connection error:', err);
      });
      // Lắng nghe sự kiện cập nhật socket
      socket.on('voteUpdate', (data: { pollId: string, updatedPoll: Poll }) => {
        if (data.pollId === pollId) {
          // Cập nhật dữ liệu cuộc thăm dò
          updatePollData(data.updatedPoll);
          
          // Kiểm tra có sự thay đổi vote
          // const totalVotesAfterUpdate = data.updatedPoll.options.reduce((acc, option) => acc + option.votes.length, 0);
          data.updatedPoll.options.reduce((acc, option) => acc + option.votes.length, 0);
          // if (totalVotesAfterUpdate > totalVotes) {
          //   alert('A new vote has been cast!'); // Hiển thị thông báo khi có một lượt vote mới
          // }
        }
      });
    }

    // Dọn dẹp khi đóng Dialog
    return () => {
      socket.off('voteUpdate');
    };
  }, [pollId, open, totalVotes]); // Thêm `totalVotes` vào dependency array để so sánh sự thay đổi

  const getRemainingTime = (endTime: string) => {
    const timeLeft = new Date(endTime).getTime() - new Date().getTime();
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (poll && poll.timeEnd) {
        const { days, hours, minutes, seconds } = getRemainingTime(poll.timeEnd);
        setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [poll]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="md">
      <DialogTitle>Live Race Statistics</DialogTitle>
      <DialogContent>
        {poll ? (
          <div>
            {poll.options.map((option, index) => {
              const votePercentage = (option.votes.length / totalVotes) * 100 || 0;
              return (
                <div key={option._id} className="race-container">
                  <div className="animal-name">{option.contentOption}</div>
                  <div className="track">
                    <div className="animal" style={{ width: `${votePercentage}%` }}>
                      {animalEmojisState[index]}
                    </div>
                  </div>
                  <div className="vote-count">{option.votes.length} votes</div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </DialogContent>
      <DialogActions style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ textAlign: "left" }}>
          {remainingTime ? (
            <p style={{ fontWeight: "bold" }}>Remaining time: {remainingTime}</p>
          ) : null}
        </div>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StatisticsDialogPolling;
