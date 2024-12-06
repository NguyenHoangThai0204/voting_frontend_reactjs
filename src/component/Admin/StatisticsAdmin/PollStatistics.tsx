import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAllVotes } from '../../../api/CallApi';
import { Poll } from '../../../typeObject';

const PollStatistics = () => {
  const [allPolls, setAllPolls] = useState<Poll[]>([]);
    const [currentCount, setCurrentCount] = useState(0);

  const [pollStats, setPollStats] = useState({
    public: { currentMonth: 0, lastMonth: 0 },
    private: { currentMonth: 0, lastMonth: 0 },
    privatesmc: { currentMonth: 0, lastMonth: 0 },
  });

  useEffect(() => {
    const fetchAllPolls = async () => {
      try {
        const response = await getAllVotes();
        const polls = Array.isArray(response.data) ? response.data : [response.data];
        setAllPolls(polls);

        // Tính toán thống kê
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const stats = {
          public: { currentMonth: 0, lastMonth: 0 },
          private: { currentMonth: 0, lastMonth: 0 },
          privatesmc: { currentMonth: 0, lastMonth: 0 },
        };

        polls.forEach((poll) => {
          const pollDate = new Date(poll.timeCreate);
          const isCurrentMonth =
            pollDate.getMonth() === currentMonth && pollDate.getFullYear() === currentYear;
          const isLastMonth =
            pollDate.getMonth() === (currentMonth === 0 ? 11 : currentMonth - 1) &&
            pollDate.getFullYear() === (currentMonth === 0 ? currentYear - 1 : currentYear);
            setCurrentCount( currentCount + 1);
          if (poll.typeContent === 'public') {
            if (isCurrentMonth) stats.public.currentMonth++;
            if (isLastMonth) stats.public.lastMonth++;
          } else if (poll.typeContent === 'private') {
            if (isCurrentMonth) stats.private.currentMonth++;
            if (isLastMonth) stats.private.lastMonth++;
          } else if (poll.typeContent === 'privatesmc') {
            if (isCurrentMonth) stats.privatesmc.currentMonth++;
            if (isLastMonth) stats.privatesmc.lastMonth++;
          }
        });

        setPollStats(stats);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };

    fetchAllPolls();
  }, []);

  const COLORS = ['#0088FE', '#FFBB28'];

  const generatePieData = (current: number, last: number) => [
    { name: 'Tháng hiện tại', value: current },
    { name: 'Tháng trước', value: last },
  ];

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Thống kê cuộc bình chọn</h2>
      <div style={{textAlign:'center'}}><h3>Biểu đồ thống kê số cuộc bình chọn so với tháng trước theo loại</h3></div>
      {/* Public Poll Chart */}
      <div style={{display:"flex"}}>
      
            <div style={{width:'32%', justifyContent:'space-between', textAlign:'center'}}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={generatePieData(pollStats.public.currentMonth, pollStats.public.lastMonth)}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {generatePieData(pollStats.public.currentMonth, pollStats.public.lastMonth).map(
              (entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              )
            )}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
                    </ResponsiveContainer><h3>Public Polls</h3></div>
            <div style={{width:'32%', justifyContent:'space-between', textAlign:'center'}}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={generatePieData(pollStats.private.currentMonth, pollStats.private.lastMonth)}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {generatePieData(pollStats.private.currentMonth, pollStats.private.lastMonth).map(
              (entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              )
            )}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
                    </ResponsiveContainer><h3>Private Polls</h3></div>
            <div style={{width:'32%', justifyContent:'space-between', textAlign:'center'}}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={generatePieData(
              pollStats.privatesmc.currentMonth,
              pollStats.privatesmc.lastMonth
            )}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {generatePieData(
              pollStats.privatesmc.currentMonth,
              pollStats.privatesmc.lastMonth
            ).map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
                    </ResponsiveContainer><h3>PrivateSMC Polls</h3></div>
      </div>
      
      <p>Số lượng người dùng đăng ký trong tháng: {currentCount}</p>
      <p>Tổng số người dùng hiện tại: {allPolls.length}</p>
      {/* <p>
        Tỷ lệ tăng trưởng so với tháng trước: {growthPercentage.toFixed(2)}%
      </p> */}
      
    </div>
  );
};

export default PollStatistics;
