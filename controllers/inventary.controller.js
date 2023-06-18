import { inventaryModel } from "../models/inventary.model.js";
import { handleErrors } from "../database/errors.js";

const getAllJewels = async (req, res) => {
  const { limit, sort, page } = req.query;

  try {
    const response = await inventaryModel.getJewels(limit, sort, page);
    return res.status(200).json({ ok: true, results: response });
  } catch (error) {
    console.error(error);
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, result: message });
  }
};

const getJewelsFilters = async (req, res) => {
  const { limit, sort, page, filters } = req.query;

  try {
    const response = await inventaryModel.getWithFilter(
      limit,
      sort,
      page,
      filters
    );
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, result: message });
  }
};

const getIdJewel = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await inventaryModel.getJewel(id);
    return res.status(200).json({ ok: true, results: response });
  } catch (error) {
    console.error(error);
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, result: message });
  }
};

export const inventaryController = {
  getAllJewels,
  getIdJewel,
  getJewelsFilters,
};
