import path from 'node:path';
import fs from 'node:fs/promises';

import asyncHandler from 'express-async-handler';

import { ResponseException } from '#app/exceptions/index.js';
import { AnnonceModel } from '#app/models/index.js';

/**
 * @desc     Get all annonces
 * @route    GET /api/v1/annonces
 * @access   Public
 */
export const getAllAnnonces = asyncHandler(async (request, response) => {
  const annonces = await AnnonceModel.find({}).populate('owner');

  return response.status(200).json({
    status: 'success',
    data: annonces,
  });
});

/**
 * @desc     Get single annonce
 * @route    GET /api/v1/annonces/:id
 * @access   Public
 */
export const getAnnonce = asyncHandler(async (request, response, next) => {
  const annonce = await AnnonceModel.findById(request.params.id).populate('owner');

  if (!annonce) {
    return next(new ResponseException(`Annonce not found with id of ${request.params.id}`, 404));
  }

  return response.status(200).json({
    status: 'success',
    data: annonce,
  });
});

/**
 * @desc     Create annonce
 * @route    POST /api/v1/annonces/:id
 * @access   Private
 */
export const createAnnonce = asyncHandler(async (request, response, next) => {
  const createAnnonceResponse = async (payload) => {
    const createdAnnonce = await AnnonceModel.create({ ...payload, owner: request.user }).then(
      (createdAnnonce) => createdAnnonce.populate('owner'),
    );

    return response.status(201).json({
      status: 'success',
      data: createdAnnonce,
    });
  };
  const file = request.files?.photo;

  if (!file) {
    await createAnnonceResponse(request.body);
    return;
  }

  if (!request.body.title) {
    return next(new ResponseException('Please add a title', 400));
  }

  if (!file.mimetype.startsWith('image')) {
    return next(new ResponseException('Please upload an image file', 400));
  }

  file.name = `photo_${request.body.title}${path.parse(file.name).ext}`;
  const targetFileUploadedPath = `uploads/${file.name}`;
  file.mv(targetFileUploadedPath, async (error) => {
    if (error) {
      console.error(error);
      return next(new ResponseException('Problem with file upload', 500));
    }

    await createAnnonceResponse({
      ...request.body,
      photo: targetFileUploadedPath,
    });
  });
});

/**
 * @desc     Update annonce
 * @route    PUT /api/v1/annonces/:id
 * @access   Private
 */
export const updateAnnonce = asyncHandler(async (request, response, next) => {
  const foundedAnnonce = await AnnonceModel.findById(request.params.id);
  if (!foundedAnnonce) {
    return next(new ResponseException(`Annonce not found with id of ${request.params.id}`, 404));
  }

  const updatedAnnonceResponse = async (id, payload) => {
    const updatedAnnonce = await AnnonceModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    }).then((updatedAnnonce) => updatedAnnonce.populate('owner'));

    return response.status(203).json({
      status: 'success',
      data: updatedAnnonce,
    });
  };

  const file = request.files?.photo;
  if (!file) {
    await updatedAnnonceResponse(request.params.id, request.body);
    return;
  }

  if (!file.mimetype.startsWith('image')) {
    return next(new ResponseException('Please upload an image file', 400));
  }

  if (request.body?.photo) await fs.rm(foundedAnnonce.photo);
  file.name = `photo_${foundedAnnonce.title}${path.parse(file.name).ext}`;
  const targetFileUploadedPath = `uploads/${file.name}`;
  file.mv(targetFileUploadedPath, async (error) => {
    if (error) {
      console.error(error);
      return next(new ResponseException('Problem with file upload', 500));
    }

    await updatedAnnonceResponse(request.params.id, {
      ...request.body,
      photo: targetFileUploadedPath,
    });
  });
});

/**
 * @desc     Delete annonce
 * @route    DELETE /api/v1/annonces/:id
 * @access   Private
 */
export const deleteAnnonce = asyncHandler(async (request, response, next) => {
  const foundedAnnonce = await AnnonceModel.findById(request.params.id);

  if (!foundedAnnonce) {
    return next(new ResponseException(`Annonce not found with id of ${request.params.id}`, 404));
  }

  await AnnonceModel.findByIdAndDelete(request.params.id);

  response.status(204).json({
    status: 'success',
    data: {},
  });
});
