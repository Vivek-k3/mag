import { Module } from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { OrganisationController } from './organisation.controller';
import { OrgSchema } from './schemas/org.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RbacSchema } from './schemas/rbac.schema';
@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'Organisation', schema: OrgSchema }],
      'auth',
    ),
    MongooseModule.forFeature([{ name: 'Rbac', schema: RbacSchema }], 'auth'),
  ],
  controllers: [OrganisationController],
  providers: [OrganisationService],
})
export class OrganisationModule {}
