import MultipleSelector, { type Option } from '@/components/ui/multiselect';

const subjects: Option[] = [
  {
    value: 'math',
    label: 'Math',
  },
  {
    value: 'science',
    label: 'Science',
  },
  {
    value: 'history',
    label: 'History',
  },
  {
    value: 'english',
    label: 'English',
  },
  {
    value: 'french',
    label: 'French',
  },
  {
    value: 'spanish',
    label: 'Spanish',
  },
];

export function SubjectsSelection() {
  return (
    <MultipleSelector
      commandProps={{
        label: 'Select subjects',
      }}
      value={subjects.slice(0, 2)}
      defaultOptions={subjects}
      placeholder='Select subjects'
      hideClearAllButton
      hidePlaceholderWhenSelected
      emptyIndicator={<p className='text-center text-sm'>Empty</p>}
    />
  );
}
