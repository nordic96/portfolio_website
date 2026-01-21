'use client';

import { cn } from '@/app/utils';
import IPhoneProFrame from '@/components/IPhoneProFrame';
import LiveProjectIframe from '@/components/LiveProjectIframe';

/**
 * Tech stack icon definitions for the live projects
 * Simple SVG icons for Three.js, Next.js, Neo4J, FastAPI
 */
const techIcons: Record<string, { svg: string; color: string; name: string }> =
  {
    threejs: {
      name: 'Three.js',
      color: '#000000',
      svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.38 0a.268.268 0 0 0-.256.332l2.894 11.716a.268.268 0 0 0 .01.04l2.89 11.708a.268.268 0 0 0 .447.128L23.802 7.15a.268.268 0 0 0-.112-.45l-5.784-1.667a.268.268 0 0 0-.123-.035L6.38 1.715a.268.268 0 0 0-.144-.04L.456.01A.268.268 0 0 0 .38 0zm.374.654L5.71 2.08 1.99 5.664zM6.61 2.34l4.864 1.4-3.65 3.515zm-.522.12l1.217 4.926-4.053.491zm6.028 1.79l4.846 1.395-3.6 3.469zM5.5 3.56l4.143 1.19-3.16 3.046zm7.15 1.93l4.11 1.182-3.134 3.02zm-7.657.428l2.892 4.09-4.063.493zm1.086 4.14l.92 3.722-3.352.407zm7.09.44l.87 3.52-3.192.388zm-6.137.456l3.69 1.062-2.807 2.705zm1.083 4.13l.817 3.314-2.952.358zm-1.082 4.105l2.623.755-2.001 1.93z"/></svg>',
    },
    nextjs: {
      name: 'Next.js',
      color: '#000000',
      svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.669-.1062.8662-.1062 1.7409 0 .8746.01 1.0719.1062 1.7409.5171 3.6081 2.6591 6.7962 5.7992 8.6316 1.2561.7344 2.6205 1.2354 4.0763 1.4966.5525.0991 2.9351.1246 3.4879.0417 2.0833-.312 3.8935-1.0102 5.4723-2.1117.1574-.1098.1884-.1449.1381-.1562-.0339-.0072-1.611-2.1421-3.5043-4.7446l-3.4429-4.6405-4.3139-6.3839c-.2394-.3535-.4369-.6463-.4381-.6502-.0012-.0026-.0233 2.8317-.0252 6.295-.0024 4.0247-.0085 6.3204-.0195 6.3604-.0151.0531-.0577.1067-.1005.1357-.0581.0394-.0867.0472-.2002.0472-.1438 0-.1767-.0146-.2401-.0676-.0454-.0379-.0727-.0827-.0815-.134-.0068-.0396-.0089-2.3592-.0068-6.2917l.003-6.2374.0463-.0658c.0252-.0358.0836-.0856.1299-.1113.078-.0429.1128-.0498.2653-.0498.1795 0 .2295.0187.3193.1096.025.0254 1.9461 2.9049 4.2688 6.3986l7.118 10.7057.7117 1.0685.0699-.0459c1.2089-.7961 2.3462-1.8774 3.2264-3.0714.9443-1.2834 1.5974-2.7433 1.9032-4.2562.0962-.669.1062-.8662.1062-1.7409 0-.8746-.01-1.0719-.1062-1.7409-.5171-3.6081-2.6591-6.7962-5.7992-8.6316-1.2395-.7251-2.5852-1.2196-4.0204-1.4749-.3667-.0651-.5831-.0861-1.2185-.1183-.3792-.0193-.7091-.0183-.8181-.0063zm4.4631 7.2605c.0798.0018.1499.0401.1826.1101.0205.0442.023.9168.021 7.0115l-.0025 6.9571-.9948-1.5291-1.2784-1.9631v-4.9863c.0-.3241-.0005-3.4131.001-4.4964.0015-.8476.0098-.9802.0468-1.0253.0426-.0517.0963-.0717.1778-.0701z"/></svg>',
    },
    neo4j: {
      name: 'Neo4J',
      color: '#4581C3',
      svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.91a9.09 9.09 0 1 1 0 18.18 9.09 9.09 0 0 1 0-18.18zm2.97 3.64c-1.67 0-3.1.96-3.78 2.36H8.49c-.48 0-.87.39-.87.87s.39.87.87.87h2.18a4.26 4.26 0 0 0-.02.36c0 .12.01.24.02.36H8.49c-.48 0-.87.39-.87.87s.39.87.87.87h2.7c.68 1.4 2.11 2.36 3.78 2.36a4.24 4.24 0 0 0 4.24-4.24 4.24 4.24 0 0 0-4.24-4.24zm0 1.74a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z"/></svg>',
    },
    fastapi: {
      name: 'FastAPI',
      color: '#009688',
      svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.375 0 0 5.375 0 12c0 6.627 5.375 12 12 12 6.626 0 12-5.373 12-12 0-6.625-5.373-12-12-12zm-.624 21.62v-7.528H7.19L13.203 2.38v7.528h4.029L11.376 21.62z"/></svg>',
    },
  };

export interface LiveProject {
  id: string;
  title: string;
  url: string;
  description: string;
  techStack: string[];
}

interface LiveProjectCardProps {
  project: LiveProject;
  className?: string;
}

/**
 * LiveProjectCard - Complete card with iPhone frame, live iframe, and project info
 *
 * Structure (from issue spec):
 * - iPhone Pro Frame (Layer 1)
 * - Live iframe content (Layer 2)
 * - Subtle gradient overlay (Layer 3)
 * - External info section below phone (Title, Tech logos, Description)
 */
export default function LiveProjectCard({
  project,
  className,
}: LiveProjectCardProps) {
  const { title, url, description, techStack } = project;

  return (
    <div className={cn('flex flex-col items-center', className)}>
      {/* iPhone Frame with iframe content */}
      <div className="relative w-full max-w-[200px] lg:max-w-[240px]">
        <IPhoneProFrame>
          {/* Live iframe (Layer 2) */}
          <LiveProjectIframe url={url} title={title} />

          {/* Subtle gradient overlay (Layer 3) */}
          <div
            className={cn(
              'absolute inset-0 z-10 pointer-events-none',
              // Subtle gradient per spec: transparent to rgba(51,51,51,0.3) at bottom
            )}
            style={{
              background:
                'linear-gradient(to bottom, transparent 0%, transparent 60%, rgba(51,51,51,0.3) 100%)',
            }}
          />
        </IPhoneProFrame>
      </div>

      {/* External Info Section - Below phone frame */}
      <div className="mt-4 text-center w-full max-w-[240px]">
        {/* Project Title */}
        <h3 className="text-xl font-bold text-text-dark">{title}</h3>

        {/* Tech Stack Icons Row */}
        <div className="flex justify-center items-center gap-2 mt-2">
          {techStack.map((tech) => {
            const techData = techIcons[tech.toLowerCase()];
            if (!techData) return null;

            return (
              <div
                key={tech}
                className="w-5 h-5 flex items-center justify-center"
                title={techData.name}
                style={{ color: techData.color }}
                dangerouslySetInnerHTML={{ __html: techData.svg }}
              />
            );
          })}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 mt-2">{description}</p>
      </div>
    </div>
  );
}
