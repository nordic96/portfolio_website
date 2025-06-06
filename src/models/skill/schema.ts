import gql from 'graphql-tag';

export const typeDef = gql`
    type Source {
        imgSrc: String!
        pageUrl: String!
        className: String!
    }

    type Skill {
        id: ID!
        name: String!
        source: Source!
        category: String!
        proficiency: String!
    }

    type Query {
        skills: [Skill!]!
        skillsByCategory(category: String!): [Skill!]!
    }
`;
