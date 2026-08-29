/**
 * Computes weighted match % between candidate skills and job requirements.
 * Each required skill has an importance weight (0-100) representing the target proficiency.
 */
export function calculateMatchPercentage(candidateSkills, jobRequiredSkills) {
  if (!jobRequiredSkills?.length) return 0;

  const skillMap = new Map(
    (candidateSkills ?? []).map((s) => [
      s.name.toLowerCase(),
      s.proficiency ?? s.score ?? 0,
    ]),
  );

  let totalWeight = 0;
  let weightedSum = 0;

  for (const req of jobRequiredSkills) {
    const target = req.importance ?? req.required ?? 80;
    const weight = req.weight ?? 1;
    totalWeight += target * weight;

    const proficiency = skillMap.get(req.name.toLowerCase()) ?? 0;
    const ratio = Math.min(proficiency / target, 1);
    weightedSum += ratio * target * weight;
  }

  return Math.round(totalWeight > 0 ? (weightedSum / totalWeight) * 100 : 0);
}

/** Skills where candidate proficiency is below 80% of the required importance. */
export function getMissingSkills(candidateSkills, jobRequiredSkills, threshold = 0.8) {
  const skillMap = new Map(
    (candidateSkills ?? []).map((s) => [
      s.name.toLowerCase(),
      s.proficiency ?? s.score ?? 0,
    ]),
  );

  return jobRequiredSkills
    .filter((req) => {
      const target = req.importance ?? req.required ?? 80;
      const proficiency = skillMap.get(req.name.toLowerCase()) ?? 0;
      return proficiency < target * threshold;
    })
    .map((req) => req.name);
}

/** Gap resources keyed by skill name — used in Gap Analysis modal. */
export const gapResourcesBySkill = {
  'System Design': [
    { title: 'Grokking the System Design Interview', type: 'Course', url: 'https://www.educative.io' },
    { title: 'System Design Primer (GitHub)', type: 'Guide', url: 'https://github.com/donnemartin/system-design-primer' },
  ],
  'Cloud Deployment': [
    { title: 'AWS Solutions Architect Associate', type: 'Certification', url: 'https://aws.amazon.com/certification' },
    { title: 'Deploy Node.js to AWS ECS', type: 'Tutorial', url: 'https://docs.aws.amazon.com' },
  ],
  'Stakeholder Communication': [
    { title: 'Technical Communication for Engineers', type: 'Course', url: 'https://www.coursera.org' },
  ],
  'Next.js': [
    { title: 'Next.js Official Learn Course', type: 'Course', url: 'https://nextjs.org/learn' },
  ],
  GraphQL: [
    { title: 'Apollo Client Tutorial', type: 'Tutorial', url: 'https://www.apollographql.com/docs/react' },
  ],
  Kubernetes: [
    { title: 'CKA Certification Path', type: 'Certification', url: 'https://www.cncf.io/certification/cka' },
  ],
  Terraform: [
    { title: 'HashiCorp Learn Terraform', type: 'Course', url: 'https://developer.hashicorp.com/terraform/tutorials' },
  ],
  Go: [{ title: 'A Tour of Go', type: 'Tutorial', url: 'https://go.dev/tour' }],
  Microservices: [
    { title: 'Microservices Patterns (O\'Reilly)', type: 'Book', url: 'https://www.oreilly.com' },
  ],
  Redis: [{ title: 'Redis University RU101', type: 'Course', url: 'https://university.redis.com' }],
  Docker: [
    { title: 'Docker for Developers (freeCodeCamp)', type: 'Tutorial', url: 'https://www.freecodecamp.org' },
  ],
  PyTorch: [
    { title: 'Fast.ai Practical Deep Learning', type: 'Course', url: 'https://course.fast.ai' },
  ],
  MLOps: [
    { title: 'Made With ML MLOps Course', type: 'Course', url: 'https://madewithml.com' },
  ],
  'Team Leadership': [
    { title: 'Engineering Management Fundamentals', type: 'Course', url: 'https://www.pluralsight.com' },
  ],
  'Roadmap Planning': [
    { title: 'Product Roadmaps Relaunch', type: 'Course', url: 'https://www.productschool.com' },
  ],
  'Advanced Testing': [
    { title: 'Testing Library Best Practices', type: 'Guide', url: 'https://testing-library.com' },
  ],
  Ansible: [
    { title: 'Ansible Official Documentation', type: 'Guide', url: 'https://docs.ansible.com' },
  ],
  'Security Compliance': [
    { title: 'SOC 2 for Startups', type: 'Guide', url: 'https://www.vanta.com' },
  ],
  'Deep Learning': [
    { title: 'Deep Learning Specialization', type: 'Course', url: 'https://www.deeplearning.ai' },
  ],
};

export function getGapResources(missingSkills) {
  const resources = [];
  for (const skill of missingSkills) {
    const items = gapResourcesBySkill[skill] ?? [
      { title: `${skill} — Complete Beginner Course`, type: 'Course', url: '#' },
    ];
    items.forEach((r) => resources.push({ ...r, skill }));
  }
  return resources;
}

export function generateAiExplanation(matchPercent, missingSkills, jobTitle) {
  const missing = missingSkills.slice(0, 3).join(', ') || 'none identified';
  if (matchPercent >= 85) {
    return `You're ${matchPercent}% aligned with ${jobTitle} — an excellent fit. Your skill profile strongly matches the core requirements. Highlight your proof-of-work projects when applying.`;
  }
  if (matchPercent >= 65) {
    return `You're ${matchPercent}% aligned with this role. You're missing: ${missing}. Recommended: focus on the top gap skill first — completing one targeted course can boost your match by 8–15%.`;
  }
  return `You're ${matchPercent}% aligned with ${jobTitle}. Significant gaps remain: ${missing}. This is a stretch role — consider building foundational skills before applying, or target similar roles with lower barriers first.`;
}

export function generateRecruiterAiSummary(candidate, job) {
  const topSkills = candidate.skills
    .sort((a, b) => (b.proficiency ?? b.score) - (a.proficiency ?? a.score))
    .slice(0, 3)
    .map((s) => s.name)
    .join(', ');

  const match = calculateMatchPercentage(candidate.skills, job?.requiredSkills ?? []);

  if (match >= 85) {
    return `${candidate.name} is a top-tier match (${match}%) for this role. Core strengths in ${topSkills} directly align with requirements.${candidate.proofOfWork?.length ? ' Verified proof of work demonstrates initiative beyond resume claims.' : ''} Strong recommendation for interview.`;
  }
  if (match >= 70) {
    return `${candidate.name} shows solid alignment (${match}%) with strengths in ${topSkills}.${candidate.adaptabilityScore >= 85 ? ' High adaptability score suggests rapid upskilling potential.' : ''} Worth shortlisting for technical assessment.`;
  }
  return `${candidate.name} presents a moderate match (${match}%) with notable skills in ${topSkills}. Some requirement gaps exist — review proof of work and learning potential scores before proceeding.`;
}
