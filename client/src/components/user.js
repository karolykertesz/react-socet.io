const User = ({ userT }) => {
  const { id, assignedTo, dueDate, notes, priority, title } = userT;
  return (
    <div className="main">
      <ul className="flex-cont">
        <li>{id}</li>
        <li>{dueDate}</li>
        <li>{notes}</li>
        <li>{priority}</li>
        <li>{title}</li>
        <li>{assignedTo}</li>
      </ul>
    </div>
  );
};
export default User;
