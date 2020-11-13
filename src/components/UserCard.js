function UserCard(props) {
    const { name, surname, desc } = props.user
    return (
        <li className="userCard">
            <p className="name">{name} {surname}</p>
            <p className="desc">{desc}</p>
        </li>
    );
}

export default UserCard;