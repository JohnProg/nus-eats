import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import MeetingCreator from './MeetingCreatorContainer';
import getMergedDate from '../../../util/getMergedDate';

const Meeting = ({ toggleMeetingWindow, canteenName, canteenId, isOpen, createMeeting,
   newMeetingDate, newMeetingTime, newMeetingDuration, title, description, titlePlaceholder,
   isLoggedIn, login, userId }) => (
     <div>
       <Button
         onClick={toggleMeetingWindow}
       >
        + Meeting
      </Button>
       <Modal
         show={isOpen}
         onHide={toggleMeetingWindow}
       >
         <Modal.Header closeButton>
           <Modal.Title>{canteenName}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <MeetingCreator canteenName={canteenName} />
         </Modal.Body>
         <Modal.Footer>
           <Button
             bsStyle="primary"
             onClick={() => {
               const invokeCreateMeeting = () => {
                 createMeeting({
                   canteenId,
                   startTime: getMergedDate(newMeetingDate, newMeetingTime),
                   duration: newMeetingDuration,
                   title: title.trim() || titlePlaceholder,
                   description,
                   userId,
                 });
                 toggleMeetingWindow();
               };
               if (!isLoggedIn) {
                 login().then(() => {
                   invokeCreateMeeting();
                 }).catch(() => {}); // do nothing if user refuse to log in
               } else {
                 invokeCreateMeeting();
               }
             }}
           >
             {isLoggedIn ? 'Create' : 'Login and create'}
           </Button>
           <Button onClick={toggleMeetingWindow}>Close</Button>
         </Modal.Footer>
       </Modal>
     </div>
  );

export default Meeting;
