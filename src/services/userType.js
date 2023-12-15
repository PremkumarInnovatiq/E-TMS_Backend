import UserType from '../models/usertype/userType';
import { getQueryParams } from '../utilities/helpers';
import User from '../models/User'
export const createUserType = async (userTypeData) => {
  try {
    const userType = new UserType(userTypeData);
    const createdUserType = await userType.save();
    return createdUserType;
  } catch (error) {
    throw error;
  }
};

export const getAllUserType = async (query) => {
  const params = getQueryParams(query, null, true);
  if (params?.allRows === 'true') {
    return UserType.find(params.filter).sort({ createdAt: -1 }) 
  }
  return await UserType.paginate(params.filter, { page: params.page, limit: params.limit, sort: params.sortBy });
};

export const updateUserType = async (userTypeId, updateData) => {
  try {
    const { typeName: type, status } = updateData;
    // Check if typeName already exists in users collection
    if (status === 'inactive') {
      const existingUser = await User.findOne({ type });
      if (existingUser) {
        throw new Error("Usertype attached to User");
      }
    }
    const updatedUserType = await UserType.findByIdAndUpdate(
      userTypeId,
      updateData,
      { new: true }
    );
    return updatedUserType;
  } catch (error) {
    throw error;
  }
};

export const deleteUserType = async (userTypeId,query) => {
  try {
    const typeName =query.typeName
    const existingUser = await User.findOne({ type:typeName });
    if (existingUser) {
      throw new Error("Usertype attached to User");
    }
    const deletedUserType = await UserType.findByIdAndDelete(userTypeId);
    return deletedUserType;
  } catch (error) {
    throw error;
  }
};

export const getMenuItemsByType = async (typeName) => {
  try {
    const userType = await UserType.findOne({ typeName });
    if (!userType) {
      throw new Error('User Type not found');
    }
    return userType.menuItems;
  } catch (error) {
    throw new Error('Failed to retrieve menu items');
  }
};

export const getUserType = async (typeName) => {
  try {
    const userType = await UserType.findOne({ typeName });
    if (!userType) {
      throw new Error('User Type not found');
    }
    return userType;
  } catch (error) {
    throw new Error('Failed to retrieve User Type');
  }
};