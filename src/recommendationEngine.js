// src/recommendationEngine.js
export function getRecommendation(answers) {
  // answers: { q1: 'Yes', q2: 'People', q3: 'Yes', ... }
  // VERY simple rules for hackathon demo:
  if (answers.q2 === 'People') {
    return {
      course: 'B.Sc Tourism (GDC) / Hospitality courses',
      jobs: ['Tour Guide (NSDC)', 'Hospitality Assistant'],
      reason: 'Prefers people-facing roles and region has tourism potential'
    };
  }
  const yesCount = Object.values(answers).filter(v => v === 'Yes').length;
  if (yesCount >= 3) {
    return {
      course: 'B.Tech IT (GDC / Local IT colleges)',
      jobs: ['Junior Web Developer', 'NSDC IT support roles'],
      reason: 'Strong logical/technical inclination'
    };
  }
  return {
    course: 'Skill certificate (Diploma / NSDC courses)',
    jobs: ['Skilled trade / entry-level jobs'],
    reason: 'Better fit for short, employable courses'
  };
}
