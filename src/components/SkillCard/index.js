import './index.css'

const SkillCard = props => {
  const {details} = props
  const {imageUrl, name} = details

  return (
    <li>
      <img src={imageUrl} alt={name} />
      <h1>{name}</h1>
    </li>
  )
}

export default SkillCard
