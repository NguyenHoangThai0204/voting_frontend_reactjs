
import UserStatistics from './UserStatistics';
import PollStatistics from './PollStatistics';

export const StatisticsAdmin = () => {
  return (
    <div style={{ padding: '10px', width:'100%', display:'flex' }}>
      
      <div style={{width:'30%'}}><UserStatistics /></div>
      <div style={{width:'70%'}}><PollStatistics /></div>
    </div>
  );
};
