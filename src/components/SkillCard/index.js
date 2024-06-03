import './index.css'

const SkillCard = props => {
  const {details} = props
  const {imageUrl, name} = details

  return (
    <li className="skill-item">
      <img className="skill-logo" src={imageUrl} alt={name} />
      <h1 className="skill-name">{name}</h1>
    </li>
  )
}

export default SkillCard
