import { PokemonTask } from '@/types';
import {
	Button,
	Input,
	Form,
	Space,
	InputNumber,
	InputRef,
	Checkbox,
} from 'antd';
import { useEffect, useRef, useState } from 'react';
const { TextArea } = Input;

interface IAddTaskFormProps {
	onSubmit: (values: PokemonTask) => void;
	isEdit?: boolean;
	task?: PokemonTask;
	onCancel?: () => void;
}
export default function AddTaskForm(props: IAddTaskFormProps) {
	const { isEdit, task, onSubmit, onCancel } = props;
	const [levelRange, setLevelRange] = useState(task?.levelRange ?? [15, 25]);
	const [isLastTask, setIsLastTask] = useState<boolean>(false);
	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue(task);
	}, [form, task]);

	const inputRef = useRef<InputRef>(null);
	useEffect(() => {
		setTimeout(() => inputRef.current?.focus(), 500);
	}, []);

	return (
		<Form
			layout={'vertical'}
			variant={'outlined'}
			colon={false}
			requiredMark={false}
			initialValues={task}
			onFinish={(values) => {
				onSubmit({ ...task, ...values, levelRange, isLastTask });
			}}>
			<Form.Item name="title" required>
				<Input placeholder="Title" required ref={inputRef} />
			</Form.Item>
			<Form.Item name="pokemonType" required>
				<Input placeholder="Pokemon Name" />
			</Form.Item>
			<Form.Item name="location" required>
				<Input placeholder="Location" required />
			</Form.Item>
			<Form.Item label="Level" name="level_range">
				<div className="w-full flex justify-stretch gap-x-2">
					<InputNumber
						name="level_range_start"
						value={levelRange[0]}
						required
						onChange={(v) => setLevelRange([v ?? 0, levelRange[1]])}
					/>
					<InputNumber
						name="level_range_end"
						required
						value={levelRange[1]}
						onChange={(v) => setLevelRange([levelRange[0], v ?? 5])}
					/>
				</div>
			</Form.Item>
			<Form.Item name="specialMove" required>
				<Input placeholder="Special Move" required />
			</Form.Item>
			<Form.Item name="catchRate" required>
				<Input placeholder="Catch Rate" required />
			</Form.Item>
			<Form.Item name={'timeOfDay'} required>
				<Input placeholder={'Time Of Day'} required />
			</Form.Item>
			<Form.Item name={'extra'}>
				<TextArea placeholder="Extra" rows={2} name="extra" />
			</Form.Item>
			<Form.Item label="Last task" name="isLastTask">
				<Checkbox
					checked={isLastTask}
					onChange={() => setIsLastTask(!isLastTask)}>
					Is this the last task?
				</Checkbox>
			</Form.Item>
			<Form.Item>
				{isEdit ? (
					<Space className="w-full">
						<Button
							type="primary"
							size="large"
							htmlType="submit"
							className="w-full">
							Save
						</Button>
						<Button size="large" onClick={onCancel} className="w-full">
							Cancel
						</Button>
					</Space>
				) : (
					<Button
						size="large"
						type="primary"
						htmlType="submit"
						className="w-full">
						Add Task
					</Button>
				)}
			</Form.Item>
		</Form>
	);
}
