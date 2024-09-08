import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { OrganisationService } from './organisation.service';

@Controller('organisation')
export class OrganisationController {
  constructor(private readonly organisationService: OrganisationService) {}

  @Post('create')
  async createOrg(@Body() createOrgDto: any) {
    return this.organisationService.createOrg(createOrgDto);
  }

  @Get('/')
  async getOrg(@Query('userId') userId: string, @Query('orgId') orgId: string) {
    if (userId) {
      return this.organisationService.getOrgByUserId(userId);
    } else if (orgId) {
      return this.organisationService.getOrgById(orgId);
    }
  }

  @Post('add-member')
  async updateOrgMembers(@Body() updateOrgMembersDto: any) {
    return this.organisationService.updateOrgMembers(updateOrgMembersDto);
  }

  @Post('create-role')
  async createOrUpdateRbac(@Body() createOrUpdateRbacDto: any) {
    return this.organisationService.createOrUpdateRbac(createOrUpdateRbacDto);
  }
}
