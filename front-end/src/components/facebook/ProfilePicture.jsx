import React from 'react';
import { Image, Tooltip, OverlayTrigger } from 'react-bootstrap';

const ProfilePicture = ({user, size = 50}) => {
  if (user.id) {
    const tooltip = <Tooltip id="tooltip">{user.name}</Tooltip>;
    return (
      <OverlayTrigger placement="top" overlay={tooltip}>
        <Image
          circle
          alt={ user.name }
          src={`https://graph.facebook.com/${user.id}/picture?height=${size}&width=${size}`} />
      </OverlayTrigger>
    );
  } else {
    return null;
  }
};

export default ProfilePicture;
