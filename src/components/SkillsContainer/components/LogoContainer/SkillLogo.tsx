import React from 'react';
import { ISkill, Proficiency } from '../../../../models/skill/Skill';

interface SkillLogoProps {
    skill: ISkill;
}

function constructTooltipClass(proficiency: Proficiency): string {
    switch (proficiency) {
        case 'advanced':
            return 'tooltip rounded shadow-lg p-1 text-xl px-2 py-1 -mt-24 mr-8 bg-indigo-500 shadow-lg shadow-indigo-500/50';
        case 'intermediate':
            return 'tooltip rounded shadow-lg p-1 text-xl px-2 py-1 -mt-24 mr-8 bg-blue-500 shadow-lg shadow-blue-500/50';
        case 'beginner':
            return 'tooltip rounded shadow-lg p-1 text-xl px-2 py-1 -mt-24 mr-8 bg-cyan-500 shadow-lg shadow-cyan-500/50';
        default:
            return 'tooltip rounded shadow-lg p-1 text-xl px-2 py-1 -mt-24 mr-8 bg-cyan-500 shadow-lg shadow-cyan-500/50';
    }
}

const SkillLogo: React.FC<SkillLogoProps> = (props) => {
    const { skill } = props;
    const className = `transition-all duration-200 ease-in-out hover:scale-120 ${skill.source.className}`;
    const tooltipClass = constructTooltipClass(skill.proficiency);
    return (
        <div
            className={
                'has-tooltip flex flex-col gap-1 justify-center text-white'
            }>
            <div className={'max-h-16 max-sm:max-h-12'}>
                <a href={skill.source.pageUrl} target={'_blank'}>
                    <img
                        alt={skill.name}
                        src={skill.source.imgSrc}
                        className={className}
                    />
                </a>
            </div>
            <span className={tooltipClass}>
                {skill.name}
                <br />
                Proficiency: {skill.proficiency}
            </span>
        </div>
    );
};

export default SkillLogo;
