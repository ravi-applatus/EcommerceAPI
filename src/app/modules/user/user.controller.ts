import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Roles } from '@shared/decorators/roles.decorator';
import { RoleTypeEnum } from '@shared/enums/role-type.enum';
import { PaginationPipe } from '@shared/pipes/pagination.pipe';
import { NotFoundDto } from '@shared/dtos/not-found.dto';
import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';
import { PaginatedUserDto } from './dtos/paginated-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindUsersDto } from './dtos/find-users.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@ApiBearerAuth()
@ApiForbiddenResponse({
  description:
    'You are not authorized to access this endpoint, please contact the administrator!',
})
@ApiUnauthorizedResponse({
  description: 'You are not authorized to access this endpoint, please login!',
})
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  @Roles(RoleTypeEnum.SuperAdmin)
  @ApiCreatedResponse({
    description: 'Record created successfully',
    type: UserDto,
  })
  create(@Body() data: CreateUserDto) {
    return this.service.create(data);
  }

  @Put(':id')
  @Roles(RoleTypeEnum.SuperAdmin)
  @ApiOkResponse({
    description: 'Record updated successfully',
    type: UserDto,
  })
  @ApiNotFoundResponse({
    description: 'Record not found',
    type: NotFoundDto,
  })
  updateById(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.service.updateById(id, data);
  }

  @Get()
  @ApiOkResponse({
    description: 'Records found successfully',
    type: PaginatedUserDto,
  })
  findAll(@Query(new PaginationPipe()) q: FindUsersDto) {
    return this.service.findPaginated((<any>q).filter, {
      ...(<any>q).options,
    });
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Record found successfully',
    type: UserDto,
  })
  @ApiNotFoundResponse({
    description: 'Record not found',
    type: NotFoundDto,
  })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Delete(':id')
  @Roles(RoleTypeEnum.SuperAdmin)
  @ApiOkResponse({
    description: 'Record deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Record not found',
    type: NotFoundDto,
  })
  deleteById(@Param('id') id: string) {
    this.service.deleteById(id);
  }
}
