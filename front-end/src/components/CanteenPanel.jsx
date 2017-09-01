import React from 'react';
import { Panel } from 'react-bootstrap';
import './CanteenPanel.css';

const CanteenPanel = ({ header, children, expanded }) => (
  <Panel
    className="CanteenPanel"
    collapsible
    expanded={expanded}
    header={header}
    bsStyle="info"
  >
    {children}
  </Panel>
);

export default CanteenPanel;
