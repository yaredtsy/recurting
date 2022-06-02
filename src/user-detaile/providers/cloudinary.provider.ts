import { Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { v2 } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

v2.config({
  cloud_name: 'suppcoin',
  api_key: '384618225342429',
  api_secret: 'pnd7d3LMWNhyXqcsG5ItjLZcjDI',
});
export const CloudinarystorageProvider = new CloudinaryStorage({
  cloudinary: v2,
});
