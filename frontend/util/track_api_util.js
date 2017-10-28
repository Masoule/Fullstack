export const fetchTracks = () => {
  return (
    $.ajax({
      method: 'get',
      url: '/api/tracks',
    })
  );
};

export const fetchTrack = (id) => {
  return (
    $.ajax({
      method: 'get',
      url: `/api/tracks/${id}`,
    })
  );
};

export const createTrack = (track) => {
  return (
    $.ajax({
      method: 'post',
      url: `/api/tracks`,
      data: {track}
    })
  );
};

export const updateTrack = (track) => {
  return (
    $.ajax({
      method: 'patch',
      url: `/api/tracks/${track.id}`,
      data: {track}
    })
  );
};

export const deleteTrack = (id) => {
  return (
    $.ajax({
      method: 'delete',
      url: `/api/tracks/${id}`,
    })
  );
};
