import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JustjoinitService } from './justjoinit.service';

@Module({
	imports: [HttpModule],
	providers: [JustjoinitService],
	exports: [JustjoinitService]
})
export class JustjoinitModule {}
