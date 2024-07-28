import {
	Button,
	Input,
	Form,
	Slider,
	Select,
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
			variant={'filled'}
			colon={false}
			requiredMark={false}
			initialValues={task}
			onFinish={(values) => {
				onSubmit({ ...task, ...values, levelRange, isLastTask });
			}}>
			<Form.Item label="Title" name="title" required>
				<Input required ref={inputRef} />
			</Form.Item>
			<Form.Item label="Pokemon Name" name="pokemonType" required>
				<Input required />
			</Form.Item>
			<Form.Item label="Location" name="location" required>
				<Input required />
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
			<Form.Item label="Special Move" name="specialMove" required>
				<Input required />
			</Form.Item>
			<Form.Item label="Catch Rate" name="catchRate" required>
				<Input required />
			</Form.Item>
			<Form.Item label={'Time Of Day'} name={'timeOfDay'} required>
				<Input required />
			</Form.Item>
			<Form.Item label={'Extra'} name={'extra'}>
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
						<Button type="primary" htmlType="submit" className="w-full">
							Save
						</Button>
						<Button onClick={onCancel} className="w-full">
							Cancel
						</Button>
					</Space>
				) : (
					<Button type="primary" htmlType="submit" className="w-full">
						Add Task
					</Button>
				)}
			</Form.Item>
		</Form>
	);
}
