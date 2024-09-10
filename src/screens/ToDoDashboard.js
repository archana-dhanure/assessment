import React, { useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import { useToDo } from "../hooks/useToDo";

const ToDoDashboard = () => {
    const { toDoData } = useToDo();
    const [activeIndex, setActiveIndex] = useState(-1);

    // Prepare data for the pie chart
    const data = [
        { name: 'Active ToDos', count: toDoData.filter(item => !item.completed).length },
        { name: 'Completed ToDos', count: toDoData.filter(item => item.completed).length },
    ];

    const COLORS = ['#79cce0', '#7dba8d'];

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    return (
        <>
            <div style={styles.chartContainer}>
                <h3>Your ToDo Summary Status Wise</h3>
                <PieChart width={700} height={700}>
                    <Pie
                        activeIndex={activeIndex}
                        data={data}
                        dataKey="count"
                        nameKey="name"
                        outerRadius={250}
                        fill="#82ca9d"
                        onMouseEnter={onPieEnter}
                        style={{ cursor: 'pointer', outline: 'none' }}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                        verticalAlign="top"
                        align="right"
                        layout="vertical"
                        iconSize={20}
                        wrapperStyle={{ padding: 20 }}
                    />
                </PieChart>
            </div>
        </>
    );
}

const styles = {
    
    chartContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center", // Center the content horizontally
        padding: "20px", // Add padding for better spacing
        border: "4px solid #ddd", // Define border width, style, and color
        borderRadius: "8px", // Optional: adds rounded corners
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" // Optional
    }
}

export default ToDoDashboard;
