import User from '../models/User.js';

export const getUsers = async (req, res) => {
  const users = await User.find({});
  const usersMap = users.map((user) => {
    return { 
      username: user.username,
      role: user.role,
      id: user._id,
      results: user.results
    };
  });
  const usersFilter = usersMap.filter((user) => user.role !== 'admin');
  return res.json(usersFilter);
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    await User.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Користувача видалено' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Помилка сервера під час видалення користувача' });
  }
};

export const deleteUsers = async (_, res) => {
  try {
    const users = await User.find({ role: 'user' });

    if (users.length === 0) {
      return res.status(404).json({ message: 'Немає користувачів для видалення' });
    }

    await User.deleteMany({ role: 'user' });

    return res.json({ message: `Видалено користувачів: ${users.length}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Помилка сервера під час масового видалення' });
  }
};

