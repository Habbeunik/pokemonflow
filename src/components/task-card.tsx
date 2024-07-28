import { EditOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Space, Typography } from 'antd';
import { useState } from 'react';
import AddTaskForm from './add-task-form';
import { PokemonTask } from '@/types';

const { Text, Title } = Typography;

interface ITaskCardProps {
	task: PokemonTask;
	onSubmit?: (p: PokemonTask) => void;
}
export default function TaskCard(props: ITaskCardProps) {
	const { task, onSubmit } = props;
	const {
		title,
		pokemonType,
		catchRate,
		levelRange: [levelStart, levelEnd],
		location,
		specialMove,
		extra,
		timeOfDay,
	} = task;
	const [isEdit, setIsEdit] = useState<boolean>(false);

	return (
		<Card style={{ width: 350 }} className="relative transition-all">
			{isEdit ? (
				<AddTaskForm
					isEdit
					task={task}
					onSubmit={(values) => {
						onSubmit?.(values);
						setIsEdit(false);
					}}
					onCancel={() => setIsEdit(false)}
				/>
			) : (
				<>
					<Button
						shape="circle"
						style={{ position: 'absolute', right: 24, bottom: 24 }}
						icon={<EditOutlined />}
						onClick={() => {
							setIsEdit(true);
						}}
					/>
					<Title level={4}>
						{title}: {pokemonType}
					</Title>
					<Space direction="vertical">
						<Text>Special Move: {specialMove}</Text>
						<Text>Location: {location}</Text>
						<Text>
							Level Range: {levelStart} -{levelEnd}
						</Text>
						<Text>Catch Rate: {catchRate}</Text>
						<Text>Time of Day: {timeOfDay}</Text>
						<Text>{extra}</Text>
					</Space>
				</>
			)}
		</Card>
	);
}

export const ChallengerTaskCard = (props: {
	task: PokemonTask;
	isComplete: boolean;
}) => {
	const {
		title,
		pokemonType,
		specialMove,
		location,
		levelRange: [levelStart, levelEnd],
		catchRate,
		timeOfDay,
		extra,
	} = props.task;
	const [checked, setChecked] = useState(props.isComplete);

	return (
		<Card
			className="relative transition-all"
			style={{
				width: 350,
				...(checked && {
					background: '#bbf7d0',
				}),
			}}>
			<Checkbox
				className="absolute right-4 top-4"
				checked={checked}
				onChange={() => setChecked(!checked)}
			/>
			<Title level={4}>
				{title}: {pokemonType}
			</Title>
			<Space direction="vertical">
				<Text>Special Move: {specialMove}</Text>
				<Text>Location: {location}</Text>
				<Text>
					Level Range: {levelStart} -{levelEnd}
				</Text>
				<Text>Catch Rate: {catchRate}</Text>
				<Text>Time of Day: {timeOfDay}</Text>
				<Text>{extra}</Text>
			</Space>
		</Card>
	);
};
