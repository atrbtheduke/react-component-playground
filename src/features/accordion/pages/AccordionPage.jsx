import { Accordion } from '../components';

const AccordionPage = () => {
  const faqItems = [
    {
      id: 'item1',
      title: 'How do I use this app?',
      content: 'This app provides a responsive navbar for navigation and a Todo list feature for task management. Use the navbar to navigate between different sections of the app. In the Todo section, you can add, edit, delete, and mark tasks as complete. You can also set alerts for tasks and filter/sort them based on different criteria.'
    },
    {
      id: 'item2',
      title: 'Where are my saved todos?',
      content: 'Your todos are saved in your browser\'s localStorage. This means they persist even when you close the browser or refresh the page. However, if you clear your browser data or use a different browser/device, you won\'t see your saved todos.'
    },
    {
      id: 'item3',
      title: 'How do I set an alert for a task?',
      content: 'Each task has an alert button (⏰). Click on it to open a date-time picker where you can select when you want to be alerted about the task. Once set, you\'ll receive a notification when the alert time is reached (as long as the app is open in your browser).'
    },
    {
      id: 'item4',
      title: 'Can I filter or sort my tasks?',
      content: 'Yes! The Todo list includes options to filter tasks by status (All, Active, Pending, Completed) and sort them by different criteria (Latest, Oldest, Alert Time, Status). You can also search for specific tasks using the search box.'
    },
    {
      id: 'item5',
      title: 'How do I change a task\'s status?',
      content: 'Each task has a status dropdown where you can select between Pending, Active, and Completed. You can also mark a task as completed by checking the checkbox next to it.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h1>
      <p className="text-gray-600 mb-8">
        Find answers to common questions about using our app.
      </p>
      <Accordion items={faqItems} />
    </div>
  );
};

export default AccordionPage;