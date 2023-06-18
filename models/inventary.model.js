import * as dotenv from 'dotenv';
dotenv.config();

import { pool } from "../database/conection.js";
import format from 'pg-format';

const getJewels = async (sort, limit = 10, page = 1) => {
  let query = 'SELECT * FROM inventario';
  const values = [];

  if (sort) {
    const [property] = Object.keys(sort);
    values.push(property, sort[property]);
    query += ' ORDER BY %s %s';
  }

  if (limit) {
    values.push(limit);
    query += ' LIMIT %s';
  }

  if (limit && page) {
    values.push((page - 1) * limit);
    query += ' OFFSET %s';
  }

  try {
    const formattedQuery = format(query, ...values);
    const { rows } = await pool.query(formattedQuery);
    return rows.map((row) => {
      return {
        name: row.nombre,
        href: `http://localhost:3000/api/joyas/${row.id}`,
      };
    });
  } catch (error) {
    throw error;
  }
};

const getWithFilter = async (limit = 10, sort, page = 1, filters) => {
  let query = 'SELECT * FROM inventario';
  const values = [];

  if (filters) {
    const propertys = Object.keys(filters);

    const operatorsQueryObject = {
      $eq: '=',
      $gt: '>',
      $gte: '>=',
      $lt: '<',
      $lte: '<=',
      $ne: '!=',
    };

    query += ' WHERE ';

    for (const key in filters) {
      const name = key;
      const object = filters[name];
      const operator = Object.keys(object)[0];
      const value = object[operator];
      query += ' %s %s %s';
      values.push(name, operatorsQueryObject[operator], value);
      if (key !== propertys[propertys.length - 1]) {
        query += ' AND ';
      }
    }
  }

  if (sort) {
    const [property] = Object.keys(sort);
    values.push(property, sort[property]);
    query += ' ORDER BY %s %s';
  }

  if (limit) {
    values.push(limit);
    query += ' LIMIT %s';
  }

  if (limit && page) {
    values.push((page - 1) * limit);
    query += ' OFFSET %s';
  }

  try {
    const formattedQuery = format(query, ...values);
    const { rows } = await pool.query(formattedQuery);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getJewel = async (id) => {
  let query = 'SELECT * FROM inventario WHERE id = %s';
  const values = [];
  values.push(id);
  try {
    const formattedQuery = format(query, ...values);
    const { rows } = await pool.query(formattedQuery);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

export const inventaryModel = {
  getJewels,
  getJewel,
  getWithFilter
};
