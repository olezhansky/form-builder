import React from 'react';
import { Modal as AntdModal, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const Modal = ({ modalData, cardIndex, isModalOpen, onOk, onCancel }) => {
  return (
    <AntdModal title={`Form${cardIndex + 1}`} open={isModalOpen} onOk={onOk} onCancel={onCancel}>
      {modalData.map((item) => {
        return (
          <p key={item.id}>
            {item?.infoIconValue && (
              <Tooltip title={item?.infoIconValue}>
                <InfoCircleOutlined style={{ marginRight: 5, cursor: 'pointer' }} />
              </Tooltip>
            )}
            <span style={{ fontWeight: 700 }}>
              {item.name}
              {item.elementIndex}
            </span>
            : <span style={{ color: item?.colorValue }}>{item.value}</span>
          </p>
        );
      })}
    </AntdModal>
  );
};

export default Modal;
