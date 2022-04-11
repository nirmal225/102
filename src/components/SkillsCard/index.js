import './index.css'

const SkillsCard = props => {
  const {skillsDetails} = props
  const {name, imageUrl} = skillsDetails

  return (
    <div className="skills-item-container">
      <img alt="name" className="skill-image" src={imageUrl} />
      <p className="name">{name}</p>
    </div>
  )
}

export default SkillsCard
