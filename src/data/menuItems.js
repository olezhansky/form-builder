import { Button, Checkbox, ColorPicker, Input, InputNumber, Select } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import TextArea from 'antd/es/input/TextArea';

export const menuItems = [
  { id: uuidv4(), key: 'form', title: 'Form', type: 'FORM' },
  {
    id: uuidv4(),
    key: 'infoIcon',
    title: 'Info icon',
    type: 'INFO_ICON',
    content: { name: 'Info icon' },
  },
  {
    id: uuidv4(),
    key: 'input',
    title: 'Input',
    isOpen: false,
    children: [
      {
        id: uuidv4(),
        type: 'BASE_INPUT',
        title: 'Base input',
        content: {
          name: 'Base input',
          placeholder: 'Base input',
          component: <Input placeholder={'Base input'} />,
          value: '',
        },
      },
      {
        id: uuidv4(),
        type: 'NUMBER_INPUT',
        title: 'Number input',
        content: {
          name: 'Number input',
          min: 1,
          max: 10,
          defaultValue: '',
          component: <InputNumber min={1} max={10} />,
          value: '',
        },
      },
    ],
  },
  {
    id: uuidv4(),
    key: 'textarea',
    title: 'Textarea',
    isOpen: false,
    children: [
      {
        id: uuidv4(),
        type: 'TEXTAREA',
        title: 'Textarea',
        content: {
          name: 'Textarea',
          placeholder: 'Max length 50',
          rows: 4,
          maxLength: 50,
          component: <TextArea rows={4} placeholder={'Max length 50'} maxLength={50} />,
          value: '',
        },
      },
    ],
  },
  {
    id: uuidv4(),
    key: 'select',
    title: 'Select',
    isOpen: false,
    children: [
      {
        id: uuidv4(),
        type: 'BASE_SELECT',
        title: 'Base select',
        content: {
          component: (
            <Select
              style={{ width: 120 }}
              options={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'disabled', label: 'Disabled', disabled: true },
              ]}
            />
          ),
          name: 'Base select',
          value: '',
        },
      },
      {
        id: uuidv4(),
        type: 'MULTI_SELECT',
        title: 'Multi select',
        content: {
          component: <Select mode='multiple' allowClear style={{ width: '100%' }} placeholder='Please select' />,
          name: 'Multi select',
        },
      },
    ],
  },
  {
    id: uuidv4(),
    key: 'checkbox',
    title: 'Checkbox',
    isOpen: false,
    children: [
      {
        id: uuidv4(),
        type: 'CHECKBOX',
        title: 'Checkbox',
        content: {
          component: <Checkbox>Checkbox</Checkbox>,
          name: 'Checkbox',
          value: '',
        },
      },
    ],
  },
  {
    id: uuidv4(),
    key: 'colorPicker',
    title: 'ColorPicker',
    isOpen: false,
    children: [
      {
        id: uuidv4(),
        type: 'COLOR_PICKER',
        title: 'ColorPicker',
        content: {
          component: <ColorPicker showText={(color) => <span>({color.toHexString()})</span>} />,
          name: 'ColorPicker',
          value: '',
        },
      },
    ],
  },
  {
    id: uuidv4(),
    key: 'button',
    title: 'Button',
    isOpen: false,
    children: [
      {
        id: uuidv4(),
        type: 'PRIMARY_BUTTON',
        title: 'Primary',
        content: {
          name: 'Primary button',
          component: <Button type='primary'>Primary button</Button>,
        },
      },
      {
        id: uuidv4(),
        type: 'DEFAULT_BUTTON',
        title: 'Default button',
        content: {
          component: <Button>Default Button</Button>,
          name: 'Default button',
        },
      },
      {
        id: uuidv4(),
        type: 'DASHED_BUTTON',
        title: 'Dashed button',
        content: {
          component: <Button type='dashed'>Dashed Button</Button>,
          name: 'Dashed button',
        },
      },
    ],
  },
];
