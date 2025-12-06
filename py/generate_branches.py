import json

def load_data():
    """Load both infoTable and existing branchData"""
    with open('infotable.json', 'r') as f:
        info_table = json.load(f)
    
    with open('public/data/branchData.json', 'r') as f:
        existing_branches = json.load(f)
    
    return info_table, existing_branches

def create_name_to_id_map(info_table):
    """Create a mapping from name to ID for quick lookup"""
    name_to_id = {}
    for person in info_table:
        name_to_id[person['name']] = person['id']
    return name_to_id

def find_person_by_id(info_table, person_id):
    """Find a person in info_table by their ID"""
    for person in info_table:
        if person['id'] == person_id:
            return person
    return None

def find_person_by_name(info_table, name):
    """Find a person in info_table by their name"""
    for person in info_table:
        if person['name'] == name:
            return person
    return None

def build_family_tree(info_table):
    """Build a mapping of people to their children"""
    # Create index for faster lookups
    id_to_person = {person['id']: person for person in info_table}
    
    # Map each person to their children
    parent_to_children = {}
    
    for person in info_table:
        father_name = person.get('father')
        mother_name = person.get('mother')
        
        if father_name:
            father = find_person_by_name(info_table, father_name)
            if father:
                if father['id'] not in parent_to_children:
                    parent_to_children[father['id']] = []
                if person['id'] not in parent_to_children[father['id']]:
                    parent_to_children[father['id']].append(person['id'])
        
        if mother_name:
            mother = find_person_by_name(info_table, mother_name)
            if mother:
                if mother['id'] not in parent_to_children:
                    parent_to_children[mother['id']] = []
                if person['id'] not in parent_to_children[mother['id']]:
                    parent_to_children[mother['id']].append(person['id'])
    
    return parent_to_children, id_to_person

def create_branch_with_relationships(branch_id, parent_to_children, id_to_person):
    """Create a branch with actual family relationships"""
    # Default placeholder values
    members = [9998, 9999]
    parents = [9998, 9999]
    
    # If branch_id is small, we might be able to infer from existing patterns
    if branch_id == 1:
        # Base branch might be core family
        # Looking at the existing data, branch 1 has members [2, 13] with parents [2, 3]
        # This suggests person 2 (Allen B Falkman Sr) and person 13 (Helen K Alexander)
        # are the core couple
        members = [2, 13]
        parents = [2, 13]  # Same as members for this base case
    elif branch_id in [2, 3]:
        # These are level 1, children of the base (branch 1)
        if branch_id == 2:
            # Based on existing: branch 2 has members [17, 39] with parents [4, 5]
            # But the pattern is not clear yet
            # Let me look more carefully at the data
            pass
        elif branch_id == 3:
            # branch 3 has members [10, 26] with parents [6, 7]
            pass
    
    return {
        "id": branch_id,
        "members": members,
        "parents": parents,
        "top": 0,  # Will be calculated based on level
        "left": 0  # Will be calculated based on position
    }

def determine_level_and_position(branch_id):
    """Determine the level and position in level for a branch ID"""
    if branch_id < 1:
        return 0, 0
    
    level = 0
    temp_id = branch_id
    while temp_id > 1:
        temp_id //= 2
        level += 1
    
    # Position in level (0-indexed)
    level_start = 2**level if level > 0 else 1
    position_in_level = branch_id - level_start
    
    return level, position_in_level

def calculate_positions():
    """Calculate top and left positions based on tree structure"""
    existing_branches = {}
    with open('public/data/branchData.json', 'r') as f:
        existing_raw = json.load(f)
        for branch in existing_raw:
            existing_branches[branch['id']] = branch
    
    all_branches = {}
    
    # Add existing branches first
    for branch in existing_raw:
        all_branches[branch['id']] = branch.copy()
    
    # Generate missing branches up to 511
    info_table, _ = load_data()
    
    # Build family relationships
    parent_to_children, id_to_person = build_family_tree(info_table)
    
    # Calculate positions and relationships for all branches 1-511
    for branch_id in range(1, 512):
        if branch_id not in all_branches:
            level, pos_in_level = determine_level_and_position(branch_id)
            
            # Calculate top position (increases by 200 per level)
            top_pos = level * 200
            
            # Calculate left position based on position in level
            # For level 0: [0]
            # For level 1: [-300, 300] 
            # For level 2: [-600, -200, 200, 600] or similar
            if level == 0:
                left_pos = 0
            else:
                # Calculate number of branches in this level
                branches_in_level = 2**level
                # Center around 0, with 300px spacing
                total_span = (branches_in_level - 1) * 600  # 600px between centers
                leftmost = -total_span // 2
                left_pos = leftmost + pos_in_level * 600
            
            # For members and parents, use placeholder for now
            # In a real implementation, we'd map these based on actual family data
            branch_obj = {
                "id": branch_id,
                "members": [9998, 9999],
                "parents": [9998, 9999],
                "top": top_pos,
                "left": left_pos
            }
            
            all_branches[branch_id] = branch_obj
    
    # Convert to list and sort by ID
    result = list(all_branches.values())
    result.sort(key=lambda x: x['id'])
    
    return result

def main():
    branches = calculate_positions()
    
    # Write the updated branchData.json
    with open('public/data/branchData.json', 'w') as f:
        json.dump(branches, f, indent=2)
    
    print(f"Created/updated branchData.json with {len(branches)} branches (IDs 1-511)")
    
    # Show first few and last few entries to verify
    print("First 5 branches:")
    for i in range(min(5, len(branches))):
        print(f"  {branches[i]}")
    
    print("\nLast 5 branches:")
    for i in range(max(0, len(branches)-5), len(branches)):
        print(f"  {branches[i]}")

if __name__ == "__main__":
    main()