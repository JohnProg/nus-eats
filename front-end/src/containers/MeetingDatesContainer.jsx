import React from 'react';
import { connect } from 'react-redux';
import MeetingDate from '../components/MeetingDate';
import { cancelMeeting, updateMeeting } from '../actions';

const MeetingDatesContainer = ({ meetings, cancelMeeting, updateMeeting }) => {
  if (meetings.length === 0) return null;
  return (
    <div>
      <div>Existing meetings</div>
      {meetings.map(([id, meeting]) => (
        <MeetingDate
          key={id}
          startTime={meeting.startTime}
          endTime={meeting.endTime}
          meetingId={id}
          cancelMeeting={cancelMeeting}
          updateMeeting={updateMeeting}
        />
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  meetings: Object.entries(state.meeting.meetings)
    .filter(([id, meeting]) => meeting.isActive &&
                               meeting.canteenId === state.meeting.canteenId),
});

const mapDispatchToProps = dispatch => ({
  cancelMeeting: cancelMeeting(dispatch),
  updateMeeting: updateMeeting(dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MeetingDatesContainer);
