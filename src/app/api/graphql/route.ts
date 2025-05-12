import { ApolloServer } from '@apollo/server';
import typeDefs from './schema';
import resolvers from './resolvers';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: process.env.NODE_ENV !== 'production',
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {});

export { handler as GET, handler as POST };
