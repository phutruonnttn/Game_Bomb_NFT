import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEthereumAddress, IsNotEmpty, IsNumber, IsString, isNumber } from 'class-validator';

@Exclude()
class WinnerDto {
    @ApiProperty({ required: true })
    @Expose()
    @IsNumber()
    gameIndex: number;

    @ApiProperty({ required: true })
    @Expose()
    @IsNotEmpty()
    arrayData: boolean[];
}

@Exclude()
class BuySkinDto {
    @ApiProperty({ required: true })
    @Expose()
    @IsString()
    addr: string;

    @ApiProperty({ required: true })
    @Expose()
    @IsNotEmpty()
    cost: number;

    @ApiProperty({ required: true })
    @Expose()
    @IsNotEmpty()
    id: number;
}

export {WinnerDto, BuySkinDto}