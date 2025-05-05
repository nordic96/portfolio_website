import { NextResponse } from 'next/server';
import connectMongo from '../../../utils/mongoConnect';
import { Document, WithId } from 'mongodb';
import {
    CertificationSchema,
    ICertificate,
} from '../../../models/certification';
import schemaUtils from '../../../utils/schemaUtils';

export async function GET() {
    const validatedCertificates: ICertificate[] = [];
    try {
        const client = await connectMongo();
        const db = client.db(process.env.MONGO_DBNAME);
        const certsCollection = db.collection('certifications');

        const cursor = certsCollection.find({});
        const certificates: WithId<Document>[] = await cursor.toArray();

        for (let doc of certificates) {
            schemaUtils.validateSchemaAndPush<ICertificate>(
                CertificationSchema,
                doc,
                validatedCertificates
            );
        }
    } catch (error) {
        return NextResponse.error();
    } finally {
        return NextResponse.json({ data: validatedCertificates });
    }
}
