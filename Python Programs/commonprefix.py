class Solution:
    def longestCommonPrefix(self, strs: list[str]) -> str:
        i = len(strs) -1
        count = i
        while count!=0:
            j = i
            while(j!=0):
                pref = " " + strs[i]
                testword = " "+strs[j-1]
                if pref in testword:
                    rstr = strs[i]
                    j-=1
                else:
                    rstr = ""
                    strs[i] = strs[i][:-1]
            count-=1    
        return rstr

words = ["flower","flow","flood","flour"]
last = int(len(words))-1
solution = Solution
print(solution.longestCommonPrefix(solution,words))
