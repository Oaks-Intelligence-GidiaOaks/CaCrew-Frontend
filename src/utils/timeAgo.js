function timeAgo(createdAt) {
  if (!createdAt) {
    return "---";
  }
  const now = new Date();
  const createdDate = new Date(createdAt);
  const timeDiffInMilliseconds = now - createdDate;
  const timeDiffInSeconds = timeDiffInMilliseconds / 1000;
  const timeDiffInMinutes = timeDiffInSeconds / 60;
  const timeDiffInHours = timeDiffInMinutes / 60;
  const timeDiffInDays = timeDiffInHours / 24;
  const timeDiffInWeeks = timeDiffInDays / 7;
  const timeDiffInYears = timeDiffInDays / 365;

  if (timeDiffInMinutes <= 2) {
    return "now";
  } else if (timeDiffInDays <= 1) {
    return "today";
  } else if (timeDiffInDays < 2) {
    return "yesterday";
  } else if (timeDiffInDays < 7) {
    return `${Math.floor(timeDiffInDays)} days ago`;
  } else if (timeDiffInWeeks < 52) {
    return `${Math.floor(timeDiffInWeeks)} weeks ago`;
  } else {
    return `${Math.floor(timeDiffInYears)} years ago`;
  }
}

export default timeAgo;
