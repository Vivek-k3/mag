import { Injectable } from '@nestjs/common';
import { OrgDocument } from './schemas/org.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RbacDocument } from './schemas/rbac.schema';

@Injectable()
export class OrganisationService {
  constructor(
    @InjectModel('Organisation', 'auth')
    private readonly organisationModel: Model<OrgDocument>,
    @InjectModel('Rbac', 'auth')
    private readonly rbacModel: Model<RbacDocument>,
  ) {}

  async createOrg(payload: any) {
    const { name, description, avatar, userId, email } = payload;

    const org = await this.organisationModel.create({
      name,
      description,
      avatar,
      ownerIds: [userId],
      members: [userId],
      domain: email.split('@')[1],
    });
    await this.rbacModel.create({
      orgId: org.orgId,
      userId,
      role: ['owner'],
    });
  }

  async getOrgById(orgId: string) {
    const org = await this.organisationModel.findOne({ orgId });
    return org;
  }

  async getOrgByUserId(userId: string) {
    const org = await this.organisationModel.findOne({ members: userId });
    return org;
  }

  async updateOrgMembers(payload: any) {
    const { orgId, userId } = payload;
    await this.organisationModel.updateOne(
      { orgId },
      { $push: { members: userId } },
    );
  }

  async createOrUpdateRbac(payload: any) {
    const { orgId, userId, role } = payload;
    const rbac = await this.rbacModel.findOne({
      orgId,
      userId,
    });

    if (rbac) {
      await this.rbacModel.updateOne({ orgId, userId }, { push: { role } });
    } else {
      await this.rbacModel.create({
        orgId,
        userId,
        role,
      });
    }
  }
}
