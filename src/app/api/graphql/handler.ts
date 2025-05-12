import { ApolloServer } from '@apollo/server';
import { merge } from 'lodash';

import { typeDef as projectType } from '../../../models/project/schema';
import { typeDef as certificateType } from '../../../models/cetificate/schema';

import { resolver as projectResolver } from '../../../models/project/resolver';
import { resolver as certificateResolver } from '../../../models/cetificate/resolver';

import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';

const typeDefs = [certificateType, projectType];
const resolvers = merge(certificateResolver, projectResolver);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: process.env.NODE_ENV !== 'production',
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {});
export default handler;
