import { render, fireEvent } from '@testing-library/react';
import TagForm from '../components/TagForm';

test('Adding a new tag updates tagData state', () => {
  // The goal for mocking is to replace something we don’t control with something we do
  const mockAddTag = jest.fn(); // Create a mock addTag function. Is used to replace the actual addTag function

  const { getByPlaceholderText, getByTestId } = render(
    <TagForm addTag={mockAddTag} /> // Pass the mock function as a prop
  );

  const inputElement = getByPlaceholderText('Enter tag name');

  fireEvent.change(inputElement, { target: { value: 'New Tag' } });

  const submitButton = getByTestId('add-tag-button');

  // fireEvent simulates clicking the 'Add' button
  fireEvent.click(submitButton);

  // Expect that the addTag function was called with the expected argument
  expect(mockAddTag).toHaveBeenCalledWith('New Tag');
});
